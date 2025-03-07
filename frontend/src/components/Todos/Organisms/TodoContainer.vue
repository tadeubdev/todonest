<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTodosStore } from '../../../stores/todos';

const { loading } = storeToRefs(useTodosStore());
</script>

<template>
  <div
    class="bg-white min-h-4/8 max-h-[60vh] md:w-lg md:size-150 w-86 md:min-h-5/8 rounded-lg border-1 border-blue-300"
    :class="{
      'grid grid-rows-[1fr_100px]': !loading,
    }"
  >
    <slot />
  </div>
</template>
