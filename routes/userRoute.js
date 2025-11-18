import express from "express";

import {
  create,
  deleteUser,
  getAllUsers,
  getUserById,
  getUserCount,
  update,
} from "../controller/userController.js";

const route = express.Router();

route.post("/user", create);
route.get("/users", getAllUsers);
route.get("/users/count", getUserCount);
route.get("/user/:id", getUserById);
route.put("/update/user/:id", update);
route.delete("/delete/user/:id", deleteUser);

export default route;
