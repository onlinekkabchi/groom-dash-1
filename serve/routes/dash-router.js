import express from "express";
import path from "node:path";
import axios from "axios";
import { list } from "../db/mongo-client.js";
import { authMiddleware } from "../middleware/auth-mid.js";

const router = express.Router();
const addr = "./static/dashboard";

router.use("/", express.static(path.resolve(addr)));
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get("/list", authMiddleware, async (req, res) => {
  try {
    await axios
      .get(list)
      .then((response) => response.data)
      .then((result) =>
        res.send(JSON.stringify({ message: "autorized", result: result }))
      )
      .catch((err) =>
        res.status(500).send(JSON.stringify({ message: "error" }))
      );
  } catch (error) {
    res.status(500).send(JSON.stringify({ message: "error" }));
  }
});

router.post("/writedash", authMiddleware, async (req, res) => {
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

router.get("/post", (req, res) => {
  res.send("post!");
});

router.post("/post", (req, res) => {
  res.send("post!");
});

export default router;
