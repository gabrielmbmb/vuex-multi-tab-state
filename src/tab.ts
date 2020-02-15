export default class Tab {
  private tabId!: string;

  private window!: Window;

  constructor(window: Window) {
    // Thanks to: https://gist.github.com/6174/6062387
    this.tabId =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);
    this.window = window;
  }

  saveState(key: string, state: any) {
    const toSave = JSON.stringify({
      id: this.tabId,
      state,
    });

    // save the state
    this.window.localStorage.setItem(key, toSave);
  }

  addEventListener(cb: Function) {
    return this.window.addEventListener('storage', (event: StorageEvent) => {
      let newState!: any;
      if (!event.newValue) {
        newState = JSON.parse(event.newValue!);
      }

      if (newState.id === this.tabId) {
        console.log('this is my state');
      }

      cb(newState.state);
    });
  }
}
