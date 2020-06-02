export const state = () => ({
  oranges: 0,
  apples: 0,
});

export const mutations = {
  addFruit(state, fruit) {
    state[fruit]++;
  },
};
