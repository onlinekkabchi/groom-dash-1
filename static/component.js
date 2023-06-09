const loginCMT = ` <h3>Login</h3>
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

const dashCMT = `<div>
    <h2>게시판</h2>
    <div id="dashboard"></div>
  </div>`;

const failCMT = `<div>로그인실패ㅠ</div>`;

const openDashCMT = `<form id="dash-form"
>
    <label for="title">제목:</label>
    <input type="text" name="title"/>
    <label for="content">내용:</label>
<textarea id="content" name="content" rows="5" cols="40" placeholder="내용 쓰세요"></textarea>
<input type="submit" value="submit"/>
</form>

<blockquote></blockquote>
   
`;

export { loginCMT, dashCMT, failCMT, openDashCMT };
