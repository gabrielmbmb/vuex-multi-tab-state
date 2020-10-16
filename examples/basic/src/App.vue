<template>
  <div>
    <h2>These will be updated in every window or tab</h2>
    <!-- Oranges -->
    <div>
      <p>🍊: {{ $store.state.fruits.oranges }}</p>
      <button @click="$store.dispatch('commitAddOrange')">Add orange</button>
    </div>

    <!-- Penguins -->
    <div>
      <p>🐧: {{ $store.state.animals.penguins }}</p>
      <button @click="$store.dispatch('commitAddPenguin')">Add penguin</button>
    </div>

    <!-- Random -->
    <div>
      <p>Counter: {{ $store.state.counter }}</p>
      <button @click="$store.commit('increment')">Increment</button>
    </div>

    <!-- Dictionary -->
    <div>
      <p>Object:</p>
      <form>
        <label for="key">Key:</label>
        <input name="key" v-model="key" />
        <label for="value">Value:</label>
        <input name="value" v-model="value" />
        <input type="submit" value="Add key/value" @click.prevent="addKeyValue" />
        <input type="submit" value="Remove key" @click.prevent="removeKey" />
        <input type="submit" value="Set object to null" @click.prevent="nullify" />
        <input type="submit" value="Create new dictionary" @click.prevent="newDictionary" />
      </form>
      <pre>{{ $store.state.dictionary }}</pre>
    </div>

    <h2>These won't be updated in every tab or window</h2>
    <!-- Wolfs -->
    <div>
      <p>🐺: {{ $store.state.animals.wolfs }}</p>
      <button @click="$store.dispatch('commitAddWolf')">Add wolf</button>
    </div>

    <!-- Apples -->
    <div>
      <p>🍎: {{ $store.state.fruits.apples }}</p>
      <button @click="$store.dispatch('commitAddApple')">Add apple</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      key: '',
      value: '',
    };
  },
  methods: {
    addKeyValue() {
      this.$store.commit('addKeyValue', { key: this.key, value: this.value });
      this.key = '';
      this.value = '';
    },
    removeKey() {
      this.$store.commit('removeKey', this.key);
      this.key = '';
      this.value = '';
    },
    nullify() {
      this.$store.commit('nullify');
    },
    newDictionary() {
      this.$store.commit('newDictionary');
    },
  },
};
</script>
