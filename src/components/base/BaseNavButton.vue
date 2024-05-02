<script lang="ts" setup>
defineProps<{
  width: number;
  height: number;
  rounded: string;
  arrow: string;
}>();
</script>

<template>
  <button
    :class="`w-${width} h-${height} rounded-${rounded}`"
    class="flex justify-center items-center bg-primary cursor-pointer transition-all hover:bg-light-blue"
  >
    <i :class="`fa-angle-${arrow}`" class="fa-solid text-white text-xl"></i>
  </button>
</template>
