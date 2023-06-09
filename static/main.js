const loginCMT = ` <h3>로그인</h3>
<form id="form-login" method="post" action="/login">    
<label for="username">Username:</label>
<input
  type="text"
  id="username"
  name="username"
  placeholder="Enter your username"
  required
/><br /><br />
<label for="password">Password:</label>
<input
  type="password"
  id="password"
  name="password"
  placeholder="Enter your password"
  required
/><br /><br />
<input type="submit" value="로그인">
<input type="button" value="회원가입">
</form>`;

const registerCMT = ` <h3>회원가입</h3>
<form method="post" action="/login">    <label for="username">Username:</label>
<input
  type="text"
  id="username"
  name="username"
  placeholder="Enter your username"
  required
/><br /><br />
<label for="password">Password:</label>
<input
  type="password"
  id="password"
  name="password"
  placeholder="Enter your password"
  required
/><br /><br />
<input type="submit" value="가입">
</form>`;

const dashCMT = `<div>
    <h2>게시판</h2>
    <div id="dashboard"></div>
  </div>`;

const failCMT = `<div>로그인실패ㅠ</div>`;

const routes = {
  "#home": homehandler,
  "#dash": dashhandler,
  "#fail": failhandler,
  "#register": registerhandler,
};

const app = document.querySelector("#app");

init();

function init() {
  function origin() {
    if (app) {
      app.innerHTML += loginCMT;
    }
  }
  const hash = window.location.hash;
  console.log(hash);

  const handler = routes[hash] || origin;

  handler();
}

function defaultHandler() {
  console.log("Page not found");
}

function homehandler() {
  // console.log("home");
  app.innerHTML = loginCMT;
}

function registerhandler() {
  app.innerHTML = registerCMT;
}

function dashhandler() {
  // console.log("dash");
  app.innerHTML = dashCMT;
}

function failhandler() {
  app.innerHTML = failCMT;
}

window.addEventListener("hashchange", function () {
  const hash = window.location.hash;

  console.log(hash);

  const handler = routes[hash] || defaultHandler;

  handler();
});

const registerBTN = document.querySelector("#form-login > input[type=button]");

if (registerBTN) {
  registerBTN.addEventListener("click", function () {
    window.location.href = "/#register";
  });
}
