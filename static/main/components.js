const loginCMT = ` <h3>로그인하세요</h3>
<form id="form-login" method="post" action="/login" attr="login">    
<label for="username">Username:</label>
<input
  type="text"
  id="username"
  name="username"
  placeholder="user1234"
  required
/>
<label for="password">Password:</label>
<input
  type="password"
  id="password"
  name="password"
  placeholder="12345aaabbc"
  required
/>
<input class="mdc-button" type="submit" value="로그인버튼"/>
</form>`;

const registerCMT = ` <h3>회원가입</h3>
<form method="post" action="/login">    <label for="username" attr="register">Username:</label>
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
<input type="submit" value="가입기능 비활성화 상태입니다.">
</form>`;

const failCMT = `<div>로그인실패ㅠ</div>`;

export { loginCMT, registerCMT, failCMT };
