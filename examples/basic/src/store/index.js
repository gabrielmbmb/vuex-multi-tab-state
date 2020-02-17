import Vue from 'vue';
import Vuex from 'vuex';
import createMultiTabState from 'vuex-multi-tab-state';

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

const animals = {
  state: {
    penguins: 0,
    wolfs: 0,
  },
  mutations: {
    addPenguin(state) {
      state.penguins += 1;
    },
    addWolf(state) {
      state.wolfs += 1;
    },
  },
  actions: {
    commitAddPenguin({ commit }) {
      commit('addPenguin');
    },
    commitAddWolf({ commit }) {
      commit('addWolf');
    },
  },
  getters: {
    getPenguins(state) {
      return state.penguins;
    },
    getWolfs(state) {
      return state.wolfs;
    },
  },
};

export default new Vuex.Store({
  state: {
    counter: 0,
  },
  mutations: {
    increment(state) {
      state.counter += 1;
    },
  },
  modules: { fruits, animals },
  plugins: [
    createMultiTabState({
      statesPaths: ['fruits.oranges', 'animals.penguins', 'counter'],
    }),
  ],
});
