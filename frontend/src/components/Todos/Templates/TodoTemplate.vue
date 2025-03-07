<script setup lang="ts">
import { ref } from 'vue';
import TodoContainer from '../Organisms/TodoContainer.vue';
import TodoList from '../Organisms/TodoList.vue';

const todos = ref([
  { id: 1, title: 'Tarefa 1', description: 'Descrição da tarefa 1', completed: false },
  { id: 2, title: 'Tarefa 2', description: 'Descrição da tarefa 2', completed: false },
  { id: 3, title: 'Tarefa 3', description: 'Descrição da tarefa 3', completed: false },
]);

const removeTodo = (id: number) => {
  todos.value = todos.value.filter(todo => todo.id !== id);
};

const toggleTodo = (id: number) => {
  const todo = todos.value.find(todo => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
};
</script>

<template>
  <div
    class="h-screen w-screen bg-blue-50 flex flex-col items-center justify-center"
  >
    <div class="flex flex-col items-center justify-center mb-4">
      <h1 class="text-4xl font-bold text-blue-600">Lista de Tarefas</h1>
      <p class="text-md text-gray-700">Gerencie suas tarefas de forma simples e rápida.</p>
    </div>

    <TodoContainer>
      <TodoList
        :todos="todos"
        @removeTodo="removeTodo"
        @toggleTodo="toggleTodo"
      />
    </TodoContainer>
  </div>
</template>
