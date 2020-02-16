<template>
  <div>
    <h2>Fruits amount will be updated in every window or tab</h2>
    <!-- Oranges -->
    <div>
      <p>🍊: {{ $store.state.fruits.oranges }}</p>
      <button @click="$store.dispatch('commitAddOrange')">Add orange</button>
    </div>

    <!-- Apples -->
    <div>
      <p>🍎: {{ $store.state.fruits.apples }}</p>
      <button @click="$store.dispatch('commitAddApple')">Add apple</button>
    </div>

    <h2>Animals won't be updated in every tab or window</h2>
    <!-- Penguins -->
    <div>
      <p>🐧: {{ $store.state.animals.penguins }}</p>
      <button @click="$store.dispatch('commitAddPenguin')">Add penguin</button>
    </div>

    <!-- Wolfs -->
    <div>
      <p>🐺: {{ $store.state.animals.wolfs }}</p>
      <button @click="$store.dispatch('commitAddWolf')">Add wolf</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
};
</script>
