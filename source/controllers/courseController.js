import sequelize from "../models/connect.js";
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

export { getAllCourse, getCourseById };
