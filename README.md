# vuex-multi-tab-state

![Travis (.org)](https://img.shields.io/travis/gabrielmbmb/vuex-multi-tab-state)
![npm](https://img.shields.io/npm/v/vuex-multi-tab-state)
![npm](https://img.shields.io/npm/dm/vuex-multi-tab-state)
![npm bundle size](https://img.shields.io/bundlephobia/min/vuex-multi-tab-state)
![npm type definitions](https://img.shields.io/npm/types/vuex-multi-tab-state)
![NPM](https://img.shields.io/npm/l/vuex-multi-tab-state)

![demo](https://raw.githubusercontent.com/gabrielmbmb/vuex-multi-tab-state/master/.github/demo.gif)

This Vuex plugin allows you to sync and share the status of your Vue application across multiple tabs or windows using the local storage.

## Installation

vuex-multi-tab-state is available in npm and can be installed with the following command:

    npm install --save vuex-multi-tab-state

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

- `modules string[]`: contains the name of the states or modules to be synchronized.

- `key string`: key of the storage in which the status will be stored.

## Collaborate

![npm collaborators](https://img.shields.io/npm/collaborators/vuex-multi-tab-state)

If you feel that something can be improved, go on, create a pull request! Please follow the programming style and document your changes correctly.
