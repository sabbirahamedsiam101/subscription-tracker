import { Router } from "express";

const subscribtionRouter = Router();

subscribtionRouter.get("/", (req, res) => {
  res.send({ title: "get all the  subscribtions" });
});

subscribtionRouter.get("/:id", (req, res) => {
  res.send({ title: "get a subscribtion" });
});

subscribtionRouter.post("/", (req, res) => {
  res.send({ title: "create a new  subscribtion" });
});

subscribtionRouter.put("/:id", (req, res) => {
  res.send({ title: "update a  subscribtion" });
});

subscribtionRouter.delete("/:id", (req, res) => {
  res.send({ title: "delete a  subscribtion" });
});

subscribtionRouter.get("/user/:id", (req, res) => {
  res.send({ title: "get all the subscribtios" });
});

subscribtionRouter.put("/:id/cancel", (req, res) => {
  res.send({ title: "cancel a subscribtio" });
});

subscribtionRouter.get("/upcoming-renewals", (req, res) => {
  res.send({ title: "get upcoming renewals" });
});



export default subscribtionRouter;