import express from "express";

import {
  create,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  update,
  getBlogCount,
} from "../controller/blogController.js";

const BlogRoute = express.Router();

BlogRoute.post("/blog", create);
BlogRoute.get("/blogs", getAllBlogs);
BlogRoute.get("/blogs/count", getBlogCount);
BlogRoute.get("/blog/:id", getBlogById);
BlogRoute.put("/update/blog/:id", update);
BlogRoute.delete("/delete/blog/:id", deleteBlog);

export default BlogRoute;
