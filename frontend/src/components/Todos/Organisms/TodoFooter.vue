<script setup lang="ts">
import { ref } from 'vue';
import TodoInput from '../Atoms/TodoInput.vue';
import TodoButton from '../Atoms/TodoButton.vue';

const emits = defineEmits(['addTodo']);

const text = ref('');

const addTodo = () => {
  if (text.value.trim() === '') {
    return;
  }
  emits('addTodo', text.value);
  text.value = '';
};
</script>

<template>
  <div
    class="border-t-1 border-blue-300 flex gap-4 items-center justify-between p-4 md:px-8 bg-white rounded-b-lg"
  >
    <TodoInput
      v-model="text"
      @model-value="text = $event"
      @on:submit="addTodo"
      placeholder="Adicione uma nova tarefa..."
    />
    <TodoButton
      @on:click="addTodo"
      class="p-3 rounded-lg bg-blue-600 border-0 focus:outline-none text-white cursor-pointer hover:bg-blue-700"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
      </svg>
    </TodoButton>
  </div>
</template>
