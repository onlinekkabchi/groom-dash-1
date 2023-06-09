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
});

app.get("/writedash", async (req, res) => {
  try {
    const response = await axios.get(list);
    const data = await response.data;
    // console.log(data);
    res.send(JSON.stringify({ sheetDATA: data }));
  } catch (error) {
    console.error(error);
    res.send("An error occurred");
  }
});

app.post("/writedash", async (req, res) => {
  try {
    const { title, content } = req.body;
    const response = await axios.post(list, null, {
      params: {
        title: title,
        content: content,
      },
    });
    const result = response.data;
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
