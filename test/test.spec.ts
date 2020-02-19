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

  it('should warn the user if the state in local storage is invalid', () => {
    window.localStorage.setItem('vuex-multi-tab', '<unparseable to json>');
    // eslint-disable-next-line no-unused-vars
    const store = new Vuex.Store({
      state: { random: 0 },
      plugins: [createMultiTabState()],
    });
    const spy = chai.spy.on(console, 'warn');
    expect(spy).to.have.been.called;
  });

  // it('should fetch state when it has been changed', () => {
  //   const testState = { id: 'randomIdHere', state: { random: 6 } };
  //   window.localStorage.setItem('vuex-multi-tab', JSON.stringify(testState));

  //   const store = new Vuex.Store({ state: { random: 0 } });
  //   const plugin = createMultiTabState();
  //   const spy = chai.spy.on(store, 'replaceState');

  //   plugin(store);

  //   testState.state.random = 10;
  //   window.localStorage.setItem('vuex-multi-tab', JSON.stringify(testState));

  //   window.dispatchEvent(new Event('storage'));

  //   // expect(spy).to.have.been.called.twice;
  // });
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

  it('should throw if local storage is not available', () => {
    Object.defineProperty(window, 'localStorage', {
      value: null,
    });
    expect(() => createMultiTabState()).to.throw();
  });
});
