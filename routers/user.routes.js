import { Router } from "express";
import { getUser, getUsers } from "../controlers/user.controler.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", authorize, getUser);

userRouter.post("/", (req, res) => {
  res.send({ title: "create a new user" });
});

userRouter.put("/:id", (req, res) => {
  res.send({ title: "update a user" });
});

userRouter.delete("/:id", (req, res) => {
  res.send({ title: "delete a user" });
});

export default userRouter;
