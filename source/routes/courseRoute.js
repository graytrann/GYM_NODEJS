import express from "express";
import {
  getAllCourse,
  getAscCourse,
  getCourseById,
  getDesCourse,
  suggestCourse,
  purchaseCourse,
} from "../controllers/courseController.js";

const courseRoot = express.Router();
courseRoot.get("/get-all-course", getAllCourse);
courseRoot.get("/get-course/:id", getCourseById);
courseRoot.post("/suggest-course", suggestCourse);
courseRoot.get("/get-course-des", getDesCourse);
courseRoot.get("/get-course-asc", getAscCourse);
courseRoot.post("/purchase", purchaseCourse);

export default courseRoot;
