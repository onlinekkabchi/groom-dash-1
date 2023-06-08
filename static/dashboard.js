if (document.querySelector("#dashboard")) {
  const dash = document.querySelector("#dashboard");
  const query = window.location.search;
  const params = new URLSearchParams(query);

  function accessDASH(t) {
    dash.innerHTML += t;
  }

  params.get("logged") === "true"
    ? accessDASH(
        `<form id="dash-form"
        >
            <label for="title">제목:</label>
            <input type="text" name="title"/>
            <label for="content">내용:</label>
    <textarea id="content" name="content" rows="5" cols="40" placeholder="내용 쓰세요"></textarea>
    <input type="submit" value="submit"/>
        </form>

        <blockquote></blockquote>
           
        `
      )
    : "";
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
