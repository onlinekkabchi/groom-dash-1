import { createPostElement } from "./component.js";

export default class Dashboard {
  constructor(app, dash, list) {
    this.app = app;
    this.dash = dash;
    this.list = list;
    this.data = [];
  }

  render() {
    while (this.list.firstChild) {
      this.list.removeChild(this.list.firstChild);
    }

    this.data.forEach((item) => {
      const listItem = createPostElement(item);
      listItem.addEventListener("click", () => {
        window.location.href = `/dash/post?id=${item.id.toString()}`;
      });
      this.list.appendChild(listItem);
    });

    console.log("rendered");

    return this;
  }

  async getList() {
    if (this.data.length > 0) {
      this.data = [];
    }
    try {
      await fetch("/dash/writedash")
        .then((res) => res.json())
        .then((res) => res.result)
        .then((result) =>
          result.data.forEach((el) => {
            this.data.push(el);
          })
        );
    } catch (error) {
      console.log(error);
    } finally {
      this.render();
      console.log(this.data);
    }
  }
}
