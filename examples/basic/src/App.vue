<template>
  <div>
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
  </div>
</template>

<script>

export default {
  name: 'App',
};
</script>
