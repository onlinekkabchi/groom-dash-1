export class User extends EventTarget {
  constructor() {
    super();
    this.state = false;
  }

  setUser(state) {
    this.state = state;
    this.dispatchEvent(new CustomEvent("userin", { detail: { state } }));
    this.dispatchEvent(new CustomEvent("userwrite", { detail: { state } }));
  }
}
