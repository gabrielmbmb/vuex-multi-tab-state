/* eslint-disable no-unused-expressions */
import Vue from 'vue';
import Vuex from 'vuex';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import createMultiTabState from '../src/index';

chai.use(spies);

Vue.use(Vuex);

// Do not show tips
Vue.config.productionTip = false;

describe('vuex-multi-tab-state basic tests', () => {
  const warnSpy = chai.spy.on(console, 'warn');

  afterEach(() => {
    if (window.localStorage !== null) {
      window.localStorage.clear();
    }
  });

  it('should fetch state from local storage', () => {
    const testState = { id: 'randomIdHere', state: { random: 6 } };
    window.localStorage.setItem('vuex-multi-tab', JSON.stringify(testState));

    const store = new Vuex.Store({ state: { random: 0 } });
    const plugin = createMultiTabState();
    const spy = chai.spy.on(store, 'replaceState');

    plugin(store);
    expect(spy).to.have.been.called.with(testState.state);
  });

  it('should fetch filtered nested modules state from local storage without no-state-mutation errors', () => {
    const testState = {
      id: 'randomIdHere',
      state: {
        random: 1,
        modA: {
          rainbow: [1, 2, 3],
          some: {
            value1: 3,
            value2: 4,
          },
        },
      },
    };
    window.localStorage.setItem('vuex-multi-tab', JSON.stringify(testState));

    const store = new Vuex.Store({
      strict: true,
      state: { random: 0 },
      modules: {
        modA: {
          //namespaced: true,
          state: {
            rainbow: [],
            some: {
              value1: 0,
              value2: 0,
            },
          },
        },
      },
    });

    const plugin = createMultiTabState({
      statesPaths: ['random', 'modA.rainbow', 'modA.some.value1'],
    });

    plugin(store);
    expect(store.state).to.be.eql({
      random: 1,
      modA: {
        rainbow: [1, 2, 3],
        some: {
          value1: 3,
          value2: 0, // not set during read-from-storage
        },
      },
    });
  });

  it('should save only the specified states in local storage', () => {
    const store = new Vuex.Store({
      state: { bar: { random: 0, rainbow: 0 }, foo: 0 },
      mutations: {
        incrementBarRandom(state) {
          state.bar.random += 1;
        },
        incrementFoo(state) {
          state.foo += 1;
        },
      },
      plugins: [createMultiTabState({ statesPaths: ['bar.random', 'foo'] })],
    });

    store.commit('incrementBarRandom');
    store.commit('incrementFoo');

    const stateInLs: string | null = window.localStorage.getItem(
      'vuex-multi-tab'
    );

    if (typeof stateInLs === 'string') {
      const parsedStateInLs = JSON.parse(stateInLs);
      expect(parsedStateInLs.state.bar.random).to.be.eq(1);
      expect(parsedStateInLs.state.foo).to.be.eq(1);
      expect(parsedStateInLs.state.bar.rainbow).to.be.undefined;
    }
  });

  it('should properly merge specified states from same parent when saving to local storage', () => {
    const store = new Vuex.Store({
      state: { bar: { random: 0, rainbow: 0 } },
      mutations: {
        incrementBarRandom(state) {
          state.bar.random += 1;
        },
      },
      plugins: [
        createMultiTabState({ statesPaths: ['bar.random', 'bar.rainbow'] }),
      ],
    });

    store.commit('incrementBarRandom');

    const stateInLs: string | null = window.localStorage.getItem(
      'vuex-multi-tab'
    );

    if (typeof stateInLs === 'string') {
      const parsedStateInLs = JSON.parse(stateInLs);
      expect(parsedStateInLs.state.bar.random).to.be.eq(1);
      expect(parsedStateInLs.state.bar.rainbow).to.be.eq(0);
    }
  });

  it('should merge arrays correctly', () => {
    const store = new Vuex.Store({
      state: { random: ['bar', 'foo'] },
    });
    const plugin = createMultiTabState();

    window.localStorage.setItem(
      'vuex-multi-tab',
      JSON.stringify({
        id: 'randomIdHere',
        state: {
          random: ['bar'],
        },
      })
    );

    plugin(store);
    expect(store.state.random).to.be.eql(['bar']);
  });

  it('should merge objects correctly', () => {
    const store = new Vuex.Store({
      state: { random: { bar1: 'foo1', bar2: 'foo1' } },
    });
    const plugin = createMultiTabState();

    window.localStorage.setItem(
      'vuex-multi-tab',
      JSON.stringify({
        id: 'randomIdHere',
        state: {
          random: { bar2: 'foo2' },
        },
      })
    );

    plugin(store);
    expect(store.state.random).to.be.eql({ bar2: 'foo2' });
  });

  it('should merge objects only from specified paths', () => {
    const store = new Vuex.Store({
      state: { random: { bar1: 'foo1', bar2: 'foo1', bar3: 'foo1' } },
    });
    const plugin = createMultiTabState({
      statesPaths: ['random.bar2', 'random.bar3'],
    });

    window.localStorage.setItem(
      'vuex-multi-tab',
      JSON.stringify({
        id: 'randomIdHere',
        state: {
          random: { bar2: 'foo2' },
        },
      })
    );

    plugin(store);
    expect(store.state.random).to.be.eql({ bar1: 'foo1', bar2: 'foo2' });
  });

  it('should properly merge falsy values', () => {
    const store = new Vuex.Store({
      state: {
        random: { bar1: 0, bar2: true },
      },
    });
    const plugin = createMultiTabState({
      statesPaths: ['random.bar1', 'random.bar2'],
    });

    window.localStorage.setItem(
      'vuex-multi-tab',
      JSON.stringify({
        id: 'randomIdHere',
        state: {
          random: { bar1: 0, bar2: false },
        },
      })
    );

    plugin(store);
    expect(store.state.random).to.be.eql({ bar1: 0, bar2: false });
  });

  it('should warn the user if the state in local storage is invalid', () => {
    window.localStorage.setItem('vuex-multi-tab', '<unparseable to json>');
    // eslint-disable-next-line no-unused-vars
    const store = new Vuex.Store({
      state: { random: 0 },
      plugins: [createMultiTabState()],
    });
    expect(warnSpy).to.have.been.called;
  });

  it('should work with onBeforeSave option set', () => {
    const store = new Vuex.Store({
      strict: true,
      state: {
        counter: 1,
      },
      mutations: {
        count(state) {
          state.counter += 1;
        },
      },
      plugins: [
        createMultiTabState({
          onBeforeSave(state) {
            if (state.counter > 2) return;

            return {
              ...state,
              __time: Date.now(),
            };
          },
        }),
      ],
    });

    store.commit('count');
    store.commit('count');
    store.commit('count');

    const stateInLs: string | null =
      window.localStorage.getItem('vuex-multi-tab');

    expect(typeof stateInLs).to.be.eq('string');
    if (typeof stateInLs === 'string') {
      const parsedStateInLs = JSON.parse(stateInLs);

      expect(parsedStateInLs.state.__time).to.be.lte(Date.now());
      expect(parsedStateInLs.state.counter).to.be.eq(2);
    }
  });

  it('should work with onBeforeReplace option set', () => {
    const testState = { id: 'randomIdHere', state: { random: 6 } };
    window.localStorage.setItem('vuex-multi-tab', JSON.stringify(testState));

    const store = new Vuex.Store({
      strict: true,
      state: { random: 0 },
    });
    const plugin = createMultiTabState({
      onBeforeReplace(state) {
        return { random: 12 };
      },
    });
    const spy = chai.spy.on(store, 'replaceState');

    plugin(store);
    expect(spy).to.have.been.called.with({ random: 12 });
    expect(store.state.random).to.be.eq(12);
  });

  it('should work with onBeforeReplace option returning falsy value', () => {
    const testState = { id: 'randomIdHere', state: { random: 6 } };
    window.localStorage.setItem('vuex-multi-tab', JSON.stringify(testState));

    const store = new Vuex.Store({
      strict: true,
      state: { random: 0 },
    });
    const plugin = createMultiTabState({
      onBeforeReplace(state) {
        return;
      },
    });
    const spy = chai.spy.on(store, 'replaceState');

    plugin(store);
    expect(spy).to.not.have.been.called;
    expect(store.state.random).to.be.eq(0);
  });

  it('should not fetch state from local storage if event newValue property is undefined', () => {
    const testState = { id: 'randomIdHere', state: { random: 6 } };
    window.localStorage.setItem('vuex-multi-tab', JSON.stringify(testState));

    const store = new Vuex.Store({
      state: { random: 0 },
      plugins: [createMultiTabState()],
    });
    const spy = chai.spy.on(store, 'replaceState');

    const event = new CustomEvent('storage');
    window.dispatchEvent(event);

    expect(spy).to.not.have.been.called.twice;
  });

  it('should save state in local storage when new state is set', () => {
    const store = new Vuex.Store({
      state: { random: 0 },
      mutations: {
        increment(state) {
          state.random += 1;
        },
      },
      plugins: [createMultiTabState()],
    });

    store.commit('increment');

    const stateInLs: string | null = window.localStorage.getItem(
      'vuex-multi-tab'
    );

    if (typeof stateInLs === 'string') {
      const parsedStateInLs = JSON.parse(stateInLs);
      expect(parsedStateInLs.state.random).to.be.eq(1);
    }
  });

  it('should fetch state when it has been changed', () => {
    Object.defineProperty(window, 'addEventListener', {
      value: (type: string, fn: Function) => {
        fn({
          key: 'vuex-multi-tab',
          newValue: JSON.stringify({
            id: 'randomIdHere',
            state: {
              random: 8,
            },
          }),
        });
      },
    });

    const testState = { id: 'randomIdHere', state: { random: 6 } };
    window.localStorage.setItem('vuex-multi-tab', JSON.stringify(testState));

    const store = new Vuex.Store({
      state: { random: 0 },
      plugins: [createMultiTabState()],
    });

    expect(store.state.random).to.be.eq(8);
  });

  it('should warn the user if the new state in local storage is invalid', () => {
    Object.defineProperty(window, 'addEventListener', {
      value: (type: string, fn: Function) => {
        fn({
          key: 'vuex-multi-tab',
          newValue: '<unparseable to json>',
        });
      },
    });

    // eslint-disable-next-line no-unused-vars
    const store = new Vuex.Store({
      state: { random: 0 },
      plugins: [createMultiTabState()],
    });

    expect(warnSpy).to.have.been.called;
  });

  it('should accept custom local storage key', () => {
    const store = new Vuex.Store({
      state: { bar: 'foo1' },
    });
    const plugin = createMultiTabState({ key: 'custom-key' });

    window.localStorage.setItem(
      'custom-key',
      JSON.stringify({
        id: 'randomIdHere',
        state: { bar: 'foo2' },
      })
    );

    plugin(store);
    expect(store.state.bar).to.be.eql('foo2');
  });

  it('should throw if local storage is not available', () => {
    Object.defineProperty(window, 'localStorage', {
      value: null,
    });
    expect(() => createMultiTabState()).to.throw();
  });
});
