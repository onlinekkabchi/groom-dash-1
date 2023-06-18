import express from "express";
import dotenv from "dotenv";
import { db, coll, client } from "../db/mongo-client.js";
import jwt from "jsonwebtoken";
import { secretKey } from "../config/jwt.js";

dotenv.config();
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get("/", (req, res) => {
  res.send("login...");
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const conn = await client.connect();
    const result = await conn
      .db(db)
      .collection(coll)
      .findOne({ userId: username, userPassword: password });
    if (result) {
      // 유저아이디 암호화
      const token = jwt.sign(
        { userId: result.userId, userPassword: result.userPassword },
        secretKey,
        { expiresIn: 3600 } // expires in 1 hour (3600 seconds)
      );

      console.log(result);
      console.log(token);

      res.redirect("/dash" + `?logged=${token}`);
    } else {
      res.redirect("/#fail");
    }
  } catch (error) {
    res
      .status(500)
      .send(JSON.stringify({ message: "server error", error: error }));
  }
});

export default router;
