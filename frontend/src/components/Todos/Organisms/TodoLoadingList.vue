<script setup lang="ts">
import TodoButton from '../Atoms/TodoButton.vue';
</script>

<template>
  <div
    class="w-full h-full flex items-center justify-center"
  >
    <div class="flex flex-col items-center justify-center">
      <TodoButton
        :spinner="true"
        class="p-2 focus:outline-none text-gray-600 cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      </TodoButton>
      <h1 class="text-2xl text-gray-400">Aguarde...</h1>
      <p class="text-md text-gray-400">
        Carregando suas tarefas.
      </p>
    </div>
  </div>
</template>
