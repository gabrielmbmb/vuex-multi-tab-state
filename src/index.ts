import Tab from './tab';
import { Options } from './types';

export default function(options: Options) {
  const tab = new Tab(window);

  console.log(options);

  return (store: any) => {
    // Add event listener to the state
    tab.addEventListener((state: object) => {
      store.replaceState(state);
    });

    store.subscribe((mutation: MutationEvent, state: any) => {
      console.log(mutation);

      // Save state in local storage
      tab.saveState('vuex', state);
    });
  };
}
