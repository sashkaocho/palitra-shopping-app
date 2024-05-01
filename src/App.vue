<script lang="ts" setup>
import TheHeader from "./partials/TheHeader.vue";
</script>

<template>
  <TheHeader />
  <main class="px-16 py-16">
    <RouterView />
  </main>
</template>

<style scoped></style>
