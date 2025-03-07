<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Adicione uma nova tarefa...',
  },
});

const emits = defineEmits(['modelValue']);
const text = ref(props.text);
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  text.value = target.value;
  emits('modelValue', text.value);
};

watch(() => props.text, (newValue) => {
  text.value = newValue;
}, { immediate: true });
</script>

<template>
  <input
    type="text"
    :value="text"
    @input="handleInput"
    :placeholder="placeholder"
    class="w-full py-2 px-3 border-1 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  />
</template>
