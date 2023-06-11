export default function Dashboard() {
  // const dash = document.querySelector("#dashboard");
  // dash.innerHTML = dashBASE;
  const list = document.querySelector("#dashboard > ul");
  // const writeBtn = document.querySelector("#dashboard > input[type='button']");

  // writeBtn.addEventListener("click", () => {
  //   console.log("글쓰기");
  //   dash.innerHTML += dashFormCMT;
  //   const form = new SubmitDashForm();
  // });

  async function getList() {
    try {
      const response = await fetch("/writedash");
      const john = await response.json();
      const data = john.sheetDATA.data;

      data.map((item) => {
        list.insertAdjacentHTML(
          "afterbegin",
          `<li>
          <h5>${item.title}</h5>
          <sub>${item.date}</sub>
          <p>${item.content}</p>
        </li>`
        );
      });
    } catch (error) {
      console.log(error);
    }
  }

  getList(); // 게시글 데이터 받아오기
}
