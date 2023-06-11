import express from "express";
import path from "node:path";
import session from "express-session";
import axios from "axios";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

dotenv.config();

const uri = process.env.MONGO_URI;
const db = process.env.MONGO_DB;
const coll = process.env.MONGO_COLLECTION;
const list = process.env.SPREAD_LIST;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const PORT = 8088;
const app = express();

app.use(express.static(path.resolve("static")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  res.sendFile(path.resolve("./static/index.html"));
});

app.get("/login", (req, res) => {
  res.send("login page...");
});

// app.post("/login", (req, res) => {
//   const { username, password } = req.body;

//   if (!req.session.loggedin) {
//     const validUsername = "admin";
//     const validPassword = "password";

//     if (username === validUsername && password === validPassword) {
//       req.session.loggedin = true;
//       req.session.username = username;
//       console.log("로그인 성공!");
//       res.redirect("/" + "?logged=true" + "#dash");
//     } else {
//       console.log("로그인 실패");
//       res.redirect("/#fail");
//     }
//   } else {
//     console.log("이미 로그인 되어 있습니다");
//     res.redirect("/" + "?logged=true" + "#dash");
//   }
// });

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const conn = await client.connect();
    const result = await conn
      .db(db)
      .collection(coll)
      .findOne({ userId: username, userPassword: password });
    if (result) {
      console.log(result);
      res.redirect("/" + "?logged=true" + "#dash");
    } else {
      res.status(406).send({ message: "no match" });
    }
  } catch (error) {
    res
      .status(500)
      .send(JSON.stringify({ message: "server error", error: error }));
  }
});

app.get("/writedash", async (req, res) => {
  // 인증과정
  try {
    await axios
      .get(list)
      .then((response) => response.data)
      .then((result) => res.send(JSON.stringify({ sheetDATA: result })))
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

app.post("/writedash", async (req, res) => {
  // 인증과정

  const { title, content } = req.body;
  await axios
    .post(list, null, {
      params: {
        title: title,
        content: content,
      },
    })
    .then((res) => res.json())
    .then((res) => res.data)
    .then((result) => res.status(200).send(result))
    .catch((err) =>
      res
        .status(500)
        .send(JSON.stringify({ message: "Axios error", error: err }))
    );
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
