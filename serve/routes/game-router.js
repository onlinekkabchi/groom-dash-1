import express from "express";
import path from "node:path";
import { authMiddleware } from "../middleware/auth-mid.js";
const router = express.Router();
router.use(express.json());

router.use("/", express.static(path.resolve("./static/game")));
router.use("/style", express.static(path.resolve("./static/style")));

router.get("/", (req, res) => {
  res.sendFile(path.resolve("./static/index.html"));
});

export default router;
