<script setup lang="ts">
import { onMounted, type Ref } from 'vue';
import TodoContainer from '../Organisms/TodoContainer.vue';
import TodoList from '../Organisms/TodoList.vue';
import TodoFooter from '../Organisms/TodoFooter.vue';
import TodoEmptyList from '../Organisms/TodoEmptyList.vue';
import type { TodoItemEnum } from '../../../enums/Todos/TodoItemEnum';
import { useTodosStore } from '../../../stores/todos';
import { storeToRefs } from 'pinia';
import TodoLoadingList from '../Organisms/TodoLoadingList.vue';

const todosStore = useTodosStore();
const { loading, todos }: { loading: Ref<boolean>, todos: Ref<TodoItemEnum[]> } = storeToRefs(todosStore);
const { fetchTodosList, removeTodo, toggleTodo, addTodo } = todosStore;

onMounted(() => {
  fetchTodosList();
});
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
      <TodoLoadingList
        v-if="loading"
      />
      <TodoEmptyList
        v-else-if="todos.length === 0"
      />
      <TodoList
        v-else
        :todos="todos"
        @removeTodo="removeTodo"
        @toggleTodo="toggleTodo"
      />
      <TodoFooter
        @addTodo="addTodo"
        v-if="!loading"
      />
    </TodoContainer>
  </div>
</template>
