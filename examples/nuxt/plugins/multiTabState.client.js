import createMultiTabState from 'vuex-multi-tab-state';

export default ({ store }) => {
  createMultiTabState({
    statesPaths: ['counter', 'fruits', 'animals.wolfs'],
  })(store);
};
