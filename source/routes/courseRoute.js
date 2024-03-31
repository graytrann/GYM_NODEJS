import express from "express";
import {
  getAllCourse,
  getCourseById,
} from "../controllers/courseController.js";

const courseRoot = express.Router();
courseRoot.get("/get-all-course", getAllCourse);
courseRoot.get("/get-course/:id", getCourseById);
export default courseRoot;
