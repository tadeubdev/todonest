<script setup lang="ts">
import { ref, watch } from 'vue';
import TodoCheckbox from '../Atoms/TodoCheckbox.vue';

const emits = defineEmits(['removeTodo', 'toggleTodo']);

const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
});

const removeTodo = (id: number) => {
  emits('removeTodo', id);
};

const todo = ref(props.todo);

const toggleTodo = () => {
  isCompleted.value = !todo.value.completed;
  todo.value.completed = todo.value.completed;
  emits('toggleTodo', isCompleted.value);
};

const isCompleted = ref(todo.value.completed);
watch(() => todo.value.completed, (newValue) => {
  isCompleted.value = newValue;
}, { immediate: true });
</script>

<template>
  <div
    @click="toggleTodo"
    class="w-full flex items-center justify-start gap-4 p-4 md:px-8 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
  >
    <TodoCheckbox
      :active="isCompleted"
      @change="toggleTodo"
    />
    <div>
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
  </div>
</template>
