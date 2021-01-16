export const state = () => ({
  wolfs: 0,
  penguins: 0,
});

export const mutations = {
  addAnimal(state, animal) {
    state[animal]++;
  },
};
