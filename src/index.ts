import _get from 'lodash.get';
import _set from 'lodash.set';
import _unset from 'lodash.unset';
import Tab from './tab';

export interface Options {
  statesPaths?: string[];
  key?: string;
}

export default function(options?: Options) {
  const tab = new Tab(window);
  let key: string = 'vuex-multi-tab';
  let statesPaths: string[] = [];

  if (options) {
    key = options.key ? options.key : key;
    statesPaths = options.statesPaths ? options.statesPaths : statesPaths;
  }

  function filterStates(
    paths: string[],
    state: { [key: string]: any }
  ): { [key: string]: any } {
    let result = {};
    paths.forEach(path => {
      const subPaths = path.split('.');
      let object: { [key: string]: any } = {};
      const branch = object;

      const value = subPaths.reduce((current, subPath) => {
        return current[subPath];
      }, state);

      for (let i = 0; i < subPaths.length - 1; i += 1) {
        object[subPaths[i]] = {};
        object = object[subPaths[i]];
      }

      object[subPaths[subPaths.length - 1]] = value;

      result = { ...result, ...branch };
    });

    return result;
  }

  function mergeState(oldState: object, newState: object) {
    // if whole state is to be replaced then do just that
    if (statesPaths.length === 0) return { ...newState };
    // else take old state
    const merged = { ...oldState };
    // and replace only specified paths
    statesPaths.forEach(statePath => {
      const newValue = _get(newState, statePath);
      // remove value if it doesn't exist, overwrite otherwise
      if (typeof newValue === 'undefined') _unset(merged, statePath);
      else _set(merged, statePath, newValue);
    });
    return merged;
  }

  if (!tab.storageAvailable()) {
    throw new Error('Local storage is not available!');
  }

  return (store: any) => {
    // First time, fetch state from local storage
    tab.fetchState(key, (state: object) => {
      store.replaceState(mergeState(store.state, state));
    });

    // Add event listener to the state saved in local storage
    tab.addEventListener(key, (state: object) => {
      store.replaceState(mergeState(store.state, state));
    });

    store.subscribe((mutation: MutationEvent, state: object) => {
      let toSave = state;

      // Filter state
      if (statesPaths.length > 0) {
        toSave = filterStates(statesPaths, state);
      }

      // Save state in local storage
      tab.saveState(key, toSave);
    });
  };
}
