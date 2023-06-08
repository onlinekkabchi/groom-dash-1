import express from "express";
import path from "node:path";
import session from "express-session";
import axios from "axios";

const PORT = 8080;
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

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!req.session.loggedin) {
    const validUsername = "admin";
    const validPassword = "password";

    if (username === validUsername && password === validPassword) {
      req.session.loggedin = true;
      req.session.username = username;
      console.log("로그인 성공!");
      res.redirect("/" + "?logged=true" + "#dash");
    } else {
      console.log("로그인 실패");
      res.redirect("/#fail");
    }
  } else {
    console.log("이미 로그인 되어 있습니다");
    res.redirect("/" + "?logged=true" + "#dash");
  }
});

app.post("/writedash", async (req, res) => {
  try {
    const { title, content } = req.body;
    const response = await axios.post(
      "https://script.google.com/macros/s/AKfycbyVhACj_zLbjHPgKUioSj_mFL__cCrJ9_IH98VYBFGFXTrvIdWqSrRUUmvw2nU5z-Mn/exec",
      null,
      {
        params: {
          title: title,
          content: content,
        },
      }
    );
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
