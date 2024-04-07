import { createToken } from "../config/jwt.js";
import { responseData } from "../config/responseData.js";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import bcrypt from "bcrypt";

let model = initModels(sequelize);

const register = async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    // Kiểm tra xem số điện thoại đã tồn tại trong cơ sở dữ liệu hay chưa
    const existingUser = await model.user.findOne({
      where: {
        Phone: phone,
      },
    });

    if (existingUser) {
      return res
        .status(401)
        .json({ error: { message: "Số điện thoại đã tồn tại" } });
    }

    // Nếu số điện thoại chưa tồn tại, tạo người dùng mới
    const newUser = await model.user.create({
      FullName: name,
      Phone: phone,
      Password: bcrypt.hashSync(password, 10),
      UserType: 1,
    });

    responseData(res, "Đã đăng ký thành công", "", 201);
  } catch (error) {
    console.error(error);
    responseData(res, "Lỗi..", "", 500);
  }
};

const login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    // Tìm người dùng theo số điện thoại
    const user = await model.user.findOne({ where: { Phone: phone } });

    if (!user) {
      return res
        .status(401)
        .json({ error: { message: "Số điện thoại không tồn tại" } });
    }

    // So sánh mật khẩu đã hash với mật khẩu được cung cấp
    const isPasswordValid = await bcrypt.compare(password, user.Password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ error: { message: "Mật khẩu không chính xác" } });
    }
    let key = new Date().getTime();
    // Tạo token JWT
    let token = createToken({ user_id: user.ID, key });
    responseData(res, "Đã Nhập Thành Công", token, 200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { register, login };
