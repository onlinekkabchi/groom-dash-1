export default class User extends EventTarget {
  constructor() {
    super();
    this.state = false;
    this.write = false;
  }

  setState(val) {
    this.state = val;
    this.dispatchEvent(
      new CustomEvent("userin", { detail: { state: "true" } })
    );
  }

  setDash(val) {
    this.write = val;
    this.dispatchEvent(
      new CustomEvent("userwrite", { detail: { write: "true" } })
    );
  }
}
