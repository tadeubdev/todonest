<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  class: {
    type: String,
    default: '',
  },
});

const emits = defineEmits(['click']);
const text = ref(props.text);
const buttonClass = ref(
  props.class || 'w-full py-2 px-3 border-1 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
);

watch(() => props.text, (newValue) => {
  text.value = newValue;
}, { immediate: true });
</script>

<template>
  <button
    type="button"
    :value="text"
    :class="buttonClass"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>
