const routes = {
  "#home": homehandler,
  "#dash": dashhandler,
  "#fail": failhandler,
};

init();

function init() {
  function origin() {
    if (app) {
      app.innerHTML = `  <h3>Login</h3>
    <form method="post" action="/login">  <label for="username">Username:</label>
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
    <input type="submit" value="Login"></form>
  `;
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
  app.innerHTML = `  <h3>Login</h3>
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
  <input type="submit" value="Login"></form>`;
}

function dashhandler() {
  // console.log("dash");
  app.innerHTML = `<div>
    <h2>게시판</h2>
    <div id="dashboard"></div>
  </div>`;
}

function failhandler() {
  app.innerHTML = `<div>로그인실패ㅠ</div>`;
}

window.addEventListener("hashchange", function () {
  const hash = window.location.hash;

  console.log(hash);

  const handler = routes[hash] || defaultHandler;

  handler();
});
