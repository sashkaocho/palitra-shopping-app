<script lang="ts" setup>
defineProps<{
  content: string;
  width: number;
}>();
</script>

<template>
  <button
    :class="`w-${width}`"
    class="bg-light-blue text-white border border-light-blue rounded-md px-8 py-2 cursor-pointer transition-all hover:bg-white hover:text-light-blue"
  >
    {{ content }}
  </button>
</template>
