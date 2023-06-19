import express from "express";
import path from "node:path";
const router = express.Router();
router.use(express.json());

router.use("/", express.static(path.resolve("./static/map")));
router.use("/style", express.static(path.resolve("./static/style")));

router.get("/", (req, res) => {
  res.sendFile(path.resolve("./static/index.html"));
});

export default router;
