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
};
</script>
