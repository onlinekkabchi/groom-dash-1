const openDashCMT = `
<ul></ul>
<input type="button" value="글쓰기"/>
`;

if (document.querySelector("#dashboard")) {
  const dash = document.querySelector("#dashboard");
  const query = window.location.search;
  const params = new URLSearchParams(query);

  params.get("logged") === "true" ? (dash.innerHTML += openDashCMT) : "";

  const list = document.querySelector("#dashboard > ul");

  if (list) {
    const result = async () => {
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
    };

    result();
  }
}

if (document.querySelector("#dash-form")) {
  const dashFORM = document.querySelector("#dash-form");

  function capture(str) {
    const block = document.querySelector("blockquote");
    block.innerText = str;
  }

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
}
