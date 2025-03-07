<script setup lang="ts">
import { ref, watch } from 'vue';
import TodoItem from '../Molecules/TodoItem.vue';

const props = defineProps({
  todos: {
    type: Array,
    required: true,
  },
});

const todos = ref(props.todos);

const emits = defineEmits(['removeTodo', 'toggleTodo']);

const removeTodo = (id: number) => {
  emits('removeTodo', id);
};

const toggleTodo = (id: number) => {
  emits('toggleTodo', id);
};

watch(() => props.todos, (newTodos) => {
  todos.value = newTodos;
}, { immediate: true });
</script>

<template>
  <div
    class="w-full overflow-y-scroll h-full flex flex-col"
  >
    <TodoItem
      v-for="todo in todos"
      :key="`todo-${todo.id}`"
      :todo="todo"
      @removeTodo="removeTodo(todo.id)"
      @toggleTodo="toggleTodo(todo.id)"
    />
  </div>
</template>
