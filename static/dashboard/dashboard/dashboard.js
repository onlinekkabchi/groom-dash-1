import { createPostElement } from "./component.js";

export default class Dashboard {
  constructor(user, app, dash, list) {
    this.user = user;
    this.app = app;
    this.dash = dash;
    this.list = list;
    this.data = [];
  }

  listItem(item) {
    const theItem = createPostElement(item);
    theItem.addEventListener("click", () => {
      window.location.href = `/dash/post?id=${item.id.toString()}`;
    });
    return theItem;
  }

  render() {
    while (this.list.firstChild) {
      this.list.removeChild(this.list.firstChild);
    }
    this.data.forEach((item) => {
      this.list.appendChild(this.listItem(item));
    });
  }

  async getList() {
    if (this.data.length > 0) {
      this.data = [];
    }
    try {
      await fetch(`/dash/list?logged=${this.user.token}`)
        .then((res) => res.json())
        .then((res) => res.result)
        .then((result) =>
          result.data.forEach((el) => {
            this.data.push(el);
          })
        );
    } catch (err) {
      alert("목록 불러올 수 없음");
    } finally {
      this.data ? this.render() : "";
    }
  }
}
