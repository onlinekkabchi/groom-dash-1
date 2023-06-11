export default function SubmitDashForm() {
  const dashFORM = document.querySelector("#dash-form");
  const cancelBtn = document.querySelector("#dash-form input[type='button']");
  //   const formBTN = document.querySelector("#dash-form input[type='submit']");

  //   formBTN.addEventListener("click", () => (this.dash.innerHTML = dashFormCMT));

  cancelBtn.addEventListener("click", () => {
    console.log("removed");
    dashFORM.remove();
  });
  dashFORM.addEventListener("submit", (e) => {
    e.preventDefault();
    const targetFORM = e.target;
    const formDATA = new FormData(targetFORM);
    const BODY = Object.fromEntries(formDATA);

    const result = async () => {
      await fetch("/writedash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(BODY),
      })
        .then((res) => res.json())
        .then((res) => capture(res.message))
        .catch((err) => console.log(err));
    };

    result();

    dashFORM.reset();
  });

  function capture(str) {
    const block = document.querySelector("blockquote");
    block.innerText = str;
  }
}
