import express from "express";
import path from "node:path";
import axios from "axios";
import { list } from "./mongo-client.js";

const dashRouter = express.Router();
const addr = "./static/dashboard";

dashRouter.use("/", express.static(path.resolve(addr)));
dashRouter.use(express.urlencoded({ extended: true }));
dashRouter.use(express.json());

dashRouter.get("/writedash", async (req, res) => {
  // 인증과정
  try {
    await axios
      .get(list)
      .then((response) => response.data)
      // .then((res) => console.log(res))
      .then((result) => res.send(JSON.stringify({ result: result })))
      .catch((err) =>
        res
          .status(500)
          .send(JSON.stringify({ message: "Axios error", error: err }))
      );
  } catch (error) {
    res
      .status(500)
      .send(JSON.stringify({ message: "server error", error: error }));
  }
});

dashRouter.post("/writedash", async (req, res) => {
  // 인증과정
  const { title, content } = req.body;
  await axios
    .post(list, null, {
      params: {
        title: title,
        content: content,
      },
    })
    .then((response) => response.data)
    .then((result) => res.send(JSON.stringify({ result: result })))
    .catch((err) =>
      res
        .status(500)
        .send(JSON.stringify({ message: "Axios error", error: err }))
    );
});

dashRouter.get("/post", (req, res) => {
  res.send("post!");
});

dashRouter.post("/post", (req, res) => {
  res.send("post!");
});

export default dashRouter;
