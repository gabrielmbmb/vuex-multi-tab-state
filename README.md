# vuex-multi-tab-state

[![Build Status](https://travis-ci.com/gabrielmbmb/vuex-multi-tab-state.svg?branch=master)](https://travis-ci.com/gabrielmbmb/vuex-multi-tab-state)
[![npm](https://img.shields.io/npm/v/vuex-multi-tab-state)](https://www.npmjs.com/package/vuex-multi-tab-state)
[![codecov](https://codecov.io/gh/gabrielmbmb/vuex-multi-tab-state/branch/master/graph/badge.svg)](https://codecov.io/gh/gabrielmbmb/vuex-multi-tab-state)
[![npm](https://img.shields.io/npm/dm/vuex-multi-tab-state)](https://www.npmjs.com/package/vuex-multi-tab-state)
[![npm bundle size](https://img.shields.io/bundlephobia/min/vuex-multi-tab-state)](https://www.npmjs.com/package/vuex-multi-tab-state)
[![npm type definitions](https://img.shields.io/npm/types/vuex-multi-tab-state)](https://www.npmjs.com/package/vuex-multi-tab-state)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![demo](https://raw.githubusercontent.com/gabrielmbmb/vuex-multi-tab-state/master/.github/demo.gif?token=AHBT6NTORAZEFGKQRZ3IC4C6KHJA6)

This Vuex plugin allows you to sync and share the status of your Vue application across multiple tabs or windows using the local storage.

## Installation

vuex-multi-tab-state is available in npm and can be installed with the following command:

    npm i vuex-multi-tab-state

## Usage

Just import vuex-multi-tab-state and add it in the plugins list of your Vuex Store object.

```javascript
import Vue from 'vue';
import Vuex from 'vuex';
import createMultiTabState from 'vuex-multi-tab-state';

Vue.use(Vuex);

export default new Vuex.Store({
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... },
  plugins: [
    createMultiTabState(),
  ],
});
```

You can check the example provided [here](https://github.com/gabrielmbmb/vuex-multi-tab-state/tree/master/examples/basic)

## API

### `createMultiTabState([options])`

Creates a new instance of the plugin with the given options. The possible options are as follows:

- `statesPaths Array<String>`: contains the name of the states to be synchronized with dot notation. If the param is not provided, the whole state of your app will be sync. Defaults to `[]`.

  > Example: the oranges will be only sync.

  ```javascript
  export default new Vuex.Store({
    state: {
      fruits: {
        oranges: 0,
        apples: 0,
      },
    },
    plugins: [createMultiTabState(['fruits.oranges'])],
  });
  ```

- `key <String>`: key of the storage in which the status will be stored. Defaults to `'vuex-multi-tab'`.

## Collaborate

![npm collaborators](https://img.shields.io/npm/collaborators/vuex-multi-tab-state)

If you feel that something can be improved, go on, create a pull request! Please follow the programming style and document your changes correctly.

## License

[![NPM](https://img.shields.io/npm/l/vuex-multi-tab-state)](https://github.com/gabrielmbmb/vuex-multi-tab-state/blob/master/LICENSE)

This project uses the GPL v3 license. More information [here](https://github.com/gabrielmbmb/vuex-multi-tab-state/blob/master/LICENSE).
