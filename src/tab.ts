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

  storageAvailable(): Boolean {
    const test = 'vuex-multi-tab-state-test';
    try {
      this.window.localStorage.setItem(test, test);
      this.window.localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  saveState(key: string, state: object) {
    const toSave = JSON.stringify({
      id: this.tabId,
      state,
    });

    // Save the state in local storage
    this.window.localStorage.setItem(key, toSave);
  }

  fetchState(key: string, cb: Function) {
    const value = this.window.localStorage.getItem(key);

    if (value) {
      try {
        const parsed = JSON.parse(value);
        cb(parsed.state);
      } catch (e) {
        console.warn(`State saved in localStorage with key ${key} is invalid!`);
      }
    }
  }

  addEventListener(key: string, cb: Function) {
    return this.window.addEventListener('storage', (event: StorageEvent) => {
      if (!event.newValue || event.key !== key) {
        return;
      }

      try {
        const newState = JSON.parse(event.newValue);

        // Check if the new state is from another tab
        if (newState.id !== this.tabId) {
          cb(newState.state);
        }
      } catch (e) {
        console.warn(
          `New state saved in localStorage with key ${key} is invalid`
        );
      }
    });
  }
}
