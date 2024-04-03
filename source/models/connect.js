import { Sequelize } from "sequelize";

const sequelize = new Sequelize("gym", "root", "1234", {
  host: "localhost",
  port: "3307",
  dialect: "mysql",
  pool: {
    max: 10, // Ví dụ: Số lượng kết nối tối đa trong pool
  },
});

try {
  await sequelize.authenticate();
  console.log("ĐÃ KẾT NỐI THÀNH CÔNG VỚI CƠ SỞ DỮ LIỆU GYM");
} catch (error) {
  console.log(error);
}

export default sequelize;
