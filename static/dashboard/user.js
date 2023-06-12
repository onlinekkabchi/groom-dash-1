export class User extends EventTarget {
  constructor() {
    super();
    this.state = false;
    this.write = false;
  }

  setState(state) {
    this.state = state;
    this.dispatchEvent(
      new CustomEvent("userin", { detail: { state: "true" } })
    );
  }

  setDash(state) {
    this.state = state;
    this.dispatchEvent(
      new CustomEvent("userwrite", { detail: { write: "true" } })
    );
  }
}
