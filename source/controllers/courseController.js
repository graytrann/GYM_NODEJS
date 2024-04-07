import sequelize from "../models/connect.js";
import { decodeToken } from "../config/jwt.js";
import initModels from "../models/init-models.js";
import { responseData } from "../config/responseData.js";

let model = initModels(sequelize);

const getAllCourse = async (req, res) => {
  try {
    const course = await model.course.findAll();

    responseData(res, "Xử lý thành công", course, 200);
  } catch (error) {
    responseData(res, "Lỗi..", "", 500);
  }
};

const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id; // Lấy ID từ URL

    const course = await model.course.findOne({
      where: {
        id: courseId, // Sử dụng ID lấy được từ URL trong truy vấn
      },
    });

    if (!course) {
      return responseData(res, "Không tìm thấy khóa học", null, 404);
    }

    responseData(res, "Xử lý thành công", course, 200);
  } catch (error) {
    console.error(error);
    responseData(res, "Lỗi khi xử lý", null, 500);
  }
};

const suggestCourse = async (req, res) => {
  const height = parseFloat(req.body.height);
  const weight = parseFloat(req.body.weight);
  const goal = req.body.goal;
  try {
    let courses = [];

    // Xác định các khóa học dựa trên mục tiêu tập
    if (goal === "giảm cân") {
      courses = await model.course.findAll({ where: { Goal: "Giảm cân" } });
    } else if (goal === "tăng cân") {
      courses = await model.course.findAll({ where: { Goal: "Tăng cân" } });
    } else if (goal === "duy trì sức khỏe") {
      courses = await model.course.findAll({
        where: { Goal: "Duy trì sức khỏe" },
      });
    } else if (goal === "thi đấu") {
      courses = await model.course.findAll({ where: { Goal: "Thi đấu" } });
    } else {
      // Trường hợp không xác định được mục tiêu tập, trả về tất cả các khóa học
      courses = await model.course.findAll();
    }

    // Gửi phản hồi với danh sách các khóa học phù hợp
    responseData(
      res,
      "Dữ liệu đã được gửi đi và xử lý thành công!",
      courses,
      200
    );
  } catch (error) {
    responseData(res, "Lỗi..", "", 500);
  }
};

const getDesCourse = async (req, res) => {
  try {
    // Truy vấn tất cả các khóa học và sắp xếp theo giá giảm dần
    const courses = await model.course.findAll({
      order: [["Price", "DESC"]],
    });

    responseData(res, "Xử lý thành công", courses, 200);
  } catch (error) {
    responseData(res, "Lỗi..", "", 500);
  }
};

const getAscCourse = async (req, res) => {
  try {
    // Truy vấn tất cả các khóa học và sắp xếp theo giá giảm dần
    const courses = await model.course.findAll({
      order: [["Price", "ASC"]],
    });

    responseData(res, "Xử lý thành công", courses, 200);
  } catch (error) {
    responseData(res, "Lỗi..", "", 500);
  }
};

const purchaseCourse = async (req, res) => {
  const { DateBegin, Duration, DisCode, Total, CourseID, hasPaid } = req.body;

  const { token } = req.headers;
  console.log(token);
  const cleanedToken = token.replace(/^"|"$/g, ""); // Loại bỏ kí tự '"' từ đầu và cuối chuỗi

  const userId = decodeToken(cleanedToken);

  console.log(userId);

  const newPurchase = await model.sign.create({
    DateBegin,
    Duration,
    DisCode,
    Total,
    UserId: userId.data.user_id,
    CourseID,
    hasPaid,
  });

  responseData(res, "Xử lý thành công", newPurchase, 200);
};

export {
  getAllCourse,
  getCourseById,
  suggestCourse,
  getDesCourse,
  getAscCourse,
  purchaseCourse,
};
