import _ from 'lodash';
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

      result = _.merge(result, branch);
    });

    return result;
  }

  // eslint-disable-next-line consistent-return
  function mergeCustomizer(objValue: any, srcValue: any) {
    // If merging array, return the new array
    if (_.isArray(objValue)) {
      return srcValue;
    }
  }

  if (!tab.storageAvailable()) {
    throw new Error('Local storage is not available!');
  }

  return (store: any) => {
    // First time, fetch state from local storage
    tab.fetchState(key, (state: object) => {
      const mergedState = _.mergeWith(store.state, state, mergeCustomizer);
      store.replaceState(mergedState);
    });

    // Add event listener to the state saved in local storage
    tab.addEventListener(key, (state: object) => {
      const mergedState = _.mergeWith(store.state, state, mergeCustomizer);
      store.replaceState(mergedState);
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
