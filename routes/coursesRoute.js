import express from "express";

import {
  create,
  deleteCourse,
  getAllCourses,
  getCourseById,
  update,
  getCourseCount,
  toggleStatus,
  getCourseStatusCount,
} from "../controller/courseController.js";

const CourseRoute = express.Router();

CourseRoute.post("/course", create);
CourseRoute.get("/courses", getAllCourses);
CourseRoute.get("/courses/count", getCourseCount);
CourseRoute.get("/course-status-count", getCourseStatusCount);
CourseRoute.get("/course/:id", getCourseById);
CourseRoute.put("/update/course/:id", update);
CourseRoute.patch("/toggle-status/:id", toggleStatus);
CourseRoute.delete("/delete/course/:id", deleteCourse);

export default CourseRoute;
