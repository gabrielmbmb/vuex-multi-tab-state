import Vue from 'vue';
import Vuex from 'vuex';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import createMultiTabState from '../lib/index';

chai.use(spies);

Vue.use(Vuex);

// Do not show tips
Vue.config.productionTip = false;

describe('vuex-multi-tab-state basic tests', () => {
  it('local storage can be used', () => {
    expect(() => createMultiTabState()).to.not.throw();
  });

  it('state is fetched from local storage', () => {
    const testState = { id: 'randomIdHere', state: { random: 6 } };
    window.localStorage.setItem('vuex-multi-tab', JSON.stringify(testState));

    const store = new Vuex.Store({ state: { random: 0 } });
    const plugin = createMultiTabState();
    const spy = chai.spy.on(store, 'replaceState');

    plugin(store);
    expect(spy).to.have.been.called.with(testState.state);
  });
});
