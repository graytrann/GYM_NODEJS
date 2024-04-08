import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "gym_elevenlaw",
  "gym_elevenlaw",
  "e6dc1031021385cd0247d72db24c8f125d6f6e3d",
  {
    host: "uee.h.filess.io",
    port: "3307",
    dialect: "mysql",
    pool: {
      max: 10, // Ví dụ: Số lượng kết nối tối đa trong pool
    },
  }
);

try {
  await sequelize.authenticate();
  console.log("ĐÃ KẾT NỐI THÀNH CÔNG VỚI CƠ SỞ DỮ LIỆU GYM");
} catch (error) {
  console.log(error);
}

export default sequelize;
