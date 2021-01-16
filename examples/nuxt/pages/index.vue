<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">nuxt</h1>
      <h2
        class="subtitle"
      >Just a basic Nuxt app to show how to integrate vuex-multi-tab-state on its store</h2>
      <div>
        <!-- Counter -->
        <div>
          <p>Counter: {{ $store.state.counter }}</p>
          <button @click="increment()">Increment</button>
        </div>

        <!-- Oranges -->
        <div>
          <p>🍊: {{ $store.state.fruits.oranges }}</p>
          <button @click="addFruit('oranges')">Add orange</button>
        </div>

        <!-- Apples -->
        <div>
          <p>🍎: {{ $store.state.fruits.apples }}</p>
          <button @click="addFruit('apples')">Add apple</button>
        </div>

        <!-- Wolfs -->
        <div>
          <p>🐺: {{ $store.state.animals.wolfs }}</p>
          <button @click="addAnimal('wolfs')">Add wolf</button>
        </div>

        <h2>Penguins won't be synced in every tab</h2>

        <!-- Penguins -->
        <div>
          <p>🐧: {{ $store.state.animals.penguins }}</p>
          <button @click="addAnimal('penguins')">Add penguin</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue';

export default {
  components: {
    Logo,
  },
  methods: {
    increment() {
      this.$store.commit('increment');
    },
    addFruit(name) {
      this.$store.commit('fruits/addFruit', name);
    },
    addAnimal(name) {
      this.$store.commit('animals/addAnimal', name);
    }
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
