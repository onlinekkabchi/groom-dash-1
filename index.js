import express from "express";
import path from "node:path";
import dotenv from "dotenv";
import dashRouter from "./serve/routes/dash-router.js";
import loginRouter from "./serve/routes/login-router.js";
import mapRouter from "./serve/routes/map-router.js";
import gameRouter from "./serve/routes/game-router.js";
dotenv.config();
const PORT = 8080;
const app = express();

app.use("/dash", dashRouter);
app.use("/login", loginRouter);
app.use("/map", mapRouter);
app.use("/game", gameRouter);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", express.static(path.resolve("./static/main")));
app.use("/style", express.static(path.resolve("./static/style")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("./static/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
