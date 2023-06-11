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
<input type="submit" value="로그인"/>
<input type="button" value="회원가입" />
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
    <div id="dashboard">
    <ul></ul>
    <input type="button" value="글쓰기"/>
    <blockquote></blockquote>
    </div>
  </div>`;

const failCMT = `<div>로그인실패ㅠ</div>`;

const dashBASE = `
<ul></ul>
<input type="button" value="글쓰기"/>
<blockquote></blockquote>
`;

const dashFormCMT = `<form id="dash-form">
  <label for="title">제목: </label>
  <textarea id="title" name="title" rows="5" cols="20"></textarea>
  <label for="content">내용: </label>
  <textarea id="content" name="content" rows="5" cols="20"></textarea>
  <input type="submit" value="submit"/>
  <input type="button" value="cancel"/>
</form>`;

export { loginCMT, registerCMT, dashCMT, failCMT, dashBASE, dashFormCMT };
