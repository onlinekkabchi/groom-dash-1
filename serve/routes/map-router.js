import express from "express";
import path from "node:path";
const router = express.Router();
router.use(express.json());
const addr = "./static/map";
router.use("/", express.static(path.resolve(addr)));

router.get("/", (req, res) => {
  res.sendFile(path.resolve(addr + "/index.html"));
});

export default router;
