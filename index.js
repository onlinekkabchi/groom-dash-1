import express from "express";
import path from "node:path";
import dotenv from "dotenv";

import dashRouter from "./serve/routes/dash-router.js";
import loginRouter from "./serve/routes/login-router.js";

dotenv.config();

const PORT = 8080;
const app = express();

app.use("/", express.static(path.resolve("./static/main")));
app.use("/dash", dashRouter);
app.use("/login", loginRouter);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.resolve("./static/main/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
