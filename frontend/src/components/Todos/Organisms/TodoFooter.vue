<script setup lang="ts">
import { ref } from 'vue';
import TodoInput from '../Atoms/TodoInput.vue';

const emits = defineEmits(['addTodo']);

const text = ref('');
</script>

<template>
  <div
    class="border-t-1 border-blue-300 flex items-center justify-between p-4 md:px-8 bg-white rounded-b-lg"
  >
    <TodoInput
      placeholder="Adicione uma nova tarefa..."
    />
  </div>
</template>
