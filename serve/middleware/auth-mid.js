import express from "express";
import jwt from "jsonwebtoken";
import { secretKey } from "../config/jwt.js";

export const authMiddleware = express.Router();

authMiddleware.use((req, res, next) => {
  console.log("Time:", Date.now());

  const token = req.query.logged;
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "Unauthorized" });
    } else {
      next();
    }
  });
});
