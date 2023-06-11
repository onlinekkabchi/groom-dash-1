import { dashBASE, dashFormCMT } from "./components.js";

export default function Dashboard() {
  this.dash = document.querySelector("#dashboard");
}

Dashboard.prototype.get = function () {
  this.dash.innerHTML = dashBASE;

  this.list = document.querySelector("#dashboard > ul");
  this.formBTN = document.querySelector("#dashboard > input[type='button']");

  this.getList();
  this.logged();
};

Dashboard.prototype.logged = function () {
  this.list = document.querySelector("#dashboard > ul");
  this.dashFORM = document.querySelector("#dash-form");
  this.formBTN.addEventListener(
    "click",
    () => (this.dash.innerHTML = dashFormCMT)
  );
  // this.dashFORM.addEventListener("submit", (e) => {
  //   e.preventDefault();
  //   const targetFORM = e.target;
  //   const formDATA = new FormData(targetFORM);
  //   const BODY = Object.fromEntries(formDATA);

  //   const result = async () => {
  //     await fetch("/writedash", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(BODY),
  //     })
  //       .then((res) => res.json())
  //       .then((res) => capture(res.message))
  //       .catch((err) => console.log(err));
  //   };

  //   result();

  //   dashFORM.reset();
  // });

  // function capture(str) {
  //   const block = document.querySelector("blockquote");
  //   block.innerText = str;
  // }
};

Dashboard.prototype.getList = async function () {
  try {
    const response = await fetch("/writedash");
    const john = await response.json();
    const data = john.sheetDATA.data;

    data.map((item) => {
      this.list.insertAdjacentHTML(
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
};
