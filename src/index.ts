import merge from 'lodash.merge';
import Tab from './tab';

export interface Options {
  modules?: string[];
  key?: string;
}

export default function(options?: Options) {
  const tab = new Tab(window);
  let key: string = 'vuex-multi-tab';
  let modules: string[] = [];

  if (options) {
    key = options.key ? options.key : key;
    modules = options.modules ? options.modules : modules;
  }

  function filterModules(state: { [key: string]: any }): object {
    const filteredState: { [key: string]: any } = {};

    Object.keys(state).forEach(k => {
      if (modules.indexOf(k) !== -1) {
        filteredState[k] = state[k];
      }
    });

    return filteredState;
  }

  if (!tab.storageAvailable()) {
    throw new Error('Local storage is not available!');
  }

  return (store: any) => {
    // First time, fetch state from local storage
    tab.fetchState(key, (state: object) => {
      const mergedState = merge(store.state, state);
      store.replaceState(mergedState);
    });

    // Add event listener to the state saved in local storage
    tab.addEventListener((state: object) => {
      const mergedState = merge(store.state, state);
      store.replaceState(mergedState);
    });

    store.subscribe((mutation: MutationEvent, state: object) => {
      let toSave = state;

      // Filter state
      if (modules.length > 0) {
        toSave = filterModules(state);
      }

      // Save state in local storage
      tab.saveState(key, toSave);
    });
  };
}
