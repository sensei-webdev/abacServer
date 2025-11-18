import express from "express";

import {
  create,
  deleteNews,
  getAllNews,
  getNewsById,
  update,
  getNewsCount,
} from "../controller/newsController.js";

const NewsRoute = express.Router();

NewsRoute.post("/news", create);
NewsRoute.get("/news", getAllNews);
NewsRoute.get("/news/count", getNewsCount);
NewsRoute.get("/news/:id", getNewsById);
NewsRoute.put("/update/news/:id", update);
NewsRoute.delete("/delete/news/:id", deleteNews);

export default NewsRoute;
