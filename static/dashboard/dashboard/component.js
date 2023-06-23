export const createFormElement = () => {
  const form = document.createElement("form");
  form.id = "dash-form";

  const titleLabel = document.createElement("label");
  titleLabel.setAttribute("for", "title");
  titleLabel.textContent = "제목: ";

  const titleTextarea = document.createElement("textarea");
  titleTextarea.id = "title";
  titleTextarea.name = "title";
  titleTextarea.rows = 5;
  titleTextarea.cols = 20;

  const contentLabel = document.createElement("label");
  contentLabel.setAttribute("for", "content");
  contentLabel.textContent = "내용: ";

  const contentTextarea = document.createElement("textarea");
  contentTextarea.id = "content";
  contentTextarea.name = "content";
  contentTextarea.rows = 5;
  contentTextarea.cols = 20;

  const submitInput = document.createElement("input");
  submitInput.type = "submit";
  submitInput.value = "submit";

  const cancelInput = document.createElement("input");
  cancelInput.id = "cancel-btn";
  cancelInput.type = "button";
  cancelInput.value = "cancel";

  const blockQuote = document.createElement("blockquote");

  form.appendChild(titleLabel);
  form.appendChild(titleTextarea);
  form.appendChild(contentLabel);
  form.appendChild(contentTextarea);
  form.appendChild(submitInput);
  form.appendChild(cancelInput);
  form.appendChild(blockQuote);

  return form;
};

export const createPostElement = (item) => {
  const listItem = document.createElement("li");
  const titleElement = document.createElement("h5");
  const subElement = document.createElement("sub");
  // const contentElement = document.createElement("p");

  titleElement.textContent = item.title;
  subElement.textContent = item.date;
  // contentElement.textContent = item.content;

  listItem.appendChild(titleElement);
  listItem.appendChild(subElement);
  // listItem.appendChild(contentElement);

  return listItem;
};

export const createDashboardElement = () => {
  const dashboardElement = document.createElement("div");
  dashboardElement.id = "dashboard";

  const writeBtnElement = document.createElement("input");
  writeBtnElement.id = "write-btn";
  writeBtnElement.type = "button";
  // writeBtnElement.classList = "mdc-button mdc-button--raised";
  writeBtnElement.value = "조금 특이한 DB에 글쓰기";

  const ulElement = document.createElement("ul");

  dashboardElement.appendChild(ulElement);
  dashboardElement.appendChild(writeBtnElement);

  return dashboardElement;
};
