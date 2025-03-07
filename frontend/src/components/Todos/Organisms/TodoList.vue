<script setup lang="ts">
import { ref, watch } from 'vue';
import TodoItem from '../Molecules/TodoItem.vue';
import type { TodoItemEnum } from '../../../enums/Todos/TodoItemEnum';

const props = defineProps({
  todos: {
    type: Array as () => Array<TodoItemEnum>,
    default: () => [],
    required: true,
  },
});

const todos = ref(props.todos);

const emits = defineEmits(['removeTodo', 'toggleTodo']);

const removeTodo = (id: string) => {
  emits('removeTodo', id);
};

const toggleTodo = (id: string) => {
  emits('toggleTodo', id);
};

watch(() => props.todos, (newTodos) => {
  todos.value = newTodos;
}, { immediate: true, deep: true });
</script>

<template>
  <div
    class="w-full overflow-y-scroll h-full flex flex-col"
  >
    <TodoItem
      v-for="todo in todos"
      :key="`todo-${todo.id}`"
      :todo="todo"
      @removeTodo="removeTodo"
      @toggleTodo="toggleTodo"
    />
  </div>
</template>
