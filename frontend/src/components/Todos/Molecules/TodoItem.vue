<script setup lang="ts">
import { ref, watch, type Ref } from 'vue';
import TodoCheckbox from '../Atoms/TodoCheckbox.vue';
import TodoButton from '../Atoms/TodoButton.vue';
import type { TodoItemEnum } from '../../../enums/Todos/TodoItemEnum';

const emits = defineEmits(['removeTodo', 'toggleTodo']);

const props = defineProps({
  todo: {
    type: Object as () => TodoItemEnum,
    default: () => ({
      id: '0',
      title: '',
      description: '',
      completed: false,
      loading: false,
    }),
    required: true,
  },
});

const todo: Ref<TodoItemEnum> = ref(props.todo);
const isCompleted: Ref<boolean> = ref(todo.value.completed);

const removeTodo = () => {
  if (todo.value.loading) {
    return;
  }
  emits('removeTodo', todo.value.id);
};

const toggleTodo = () => {
  if (todo.value.loading) {
    return;
  }
  emits('toggleTodo', todo.value.id);
};

watch(() => todo.value, (newValue) => {
  isCompleted.value = newValue.completed;
  todo.value = newValue;
}, { immediate: true, deep: true });
</script>

<template>
  <div
    @click="toggleTodo"
    class="w-full flex items-center justify-start gap-4 p-4 md:px-8 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
  >
    <TodoCheckbox
      :disabled="todo.loading"
      :active="isCompleted"
      @change="toggleTodo"
    />
    <div
      class="w-full max-w-2xl"
      :class="[
        todo.loading ? 'opacity-50' : '',
      ]"
    >
      <h4
        class="text-lg cursor-pointer"
        :class="[
          isCompleted ? 'line-through text-gray-400' : 'text-gray-800'
        ]"
      >
        {{ todo.title }}
      </h4>
      <p
        class="text-sm text-gray-600"
        :class="[
          isCompleted ? 'line-through text-gray-400' : 'text-gray-600'
        ]"
      >
        {{ todo.description }}
      </p>
    </div>
    <TodoButton
      v-if="!todo.loading"
      class="p-2 focus:outline-none text-gray-600 cursor-pointer hover:text-red-500"
      @click.stop="removeTodo"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
      </svg>
    </TodoButton>
    <TodoButton
      v-else
      :spinner="true"
      class="p-2 focus:outline-none text-gray-600 cursor-pointer"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    </TodoButton>
  </div>
</template>
