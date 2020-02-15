import Vue from 'vue';
import Vuex from 'vuex';
import something from '../../../../dist/index';

Vue.use(Vuex);

// Modules
const fruits = {
  state: {
    oranges: 0,
    apples: 0,
  },
  mutations: {
    addOrange(state) {
      state.oranges += 1;
    },
    addApple(state) {
      state.apples += 1;
    },
  },
  actions: {
    commitAddOrange({ commit }) {
      commit('addOrange');
    },
    commitAddApple({ commit }) {
      commit('addApple');
    },
  },
  getters: {
    getOranges(state) {
      return state.oranges;
    },
    getApples(state) {
      return state.apples;
    },
  },
};

export default new Vuex.Store({
  modules: { fruits },
  plugins: [
    something({
      modules: ['fruits'],
    }),
  ],
});
