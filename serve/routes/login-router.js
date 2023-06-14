import express from "express";
import dotenv from "dotenv";
import { db, coll, client } from "./mongo-client.js";

dotenv.config();

const loginRouter = express.Router();

loginRouter.use(express.urlencoded({ extended: true }));
loginRouter.use(express.json());

loginRouter.get("/", (req, res) => {
  res.send("login page...");
});

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const conn = await client.connect();
    const result = await conn
      .db(db)
      .collection(coll)
      .findOne({ userId: username, userPassword: password });
    if (result) {
      console.log(result);
      res.redirect("/dash" + `?logged=${result.userId}`);
    } else {
      console.log(result);
      res.redirect("/#fail");
    }
  } catch (error) {
    res
      .status(500)
      .send(JSON.stringify({ message: "server error", error: error }));
  }
});

export default loginRouter;
