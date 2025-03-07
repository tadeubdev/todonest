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
  spinner: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['on:click']);
const text = ref(props.text);
const spinner = ref(props.spinner);

const buttonClass = ref(
  props.class || 'w-full py-2 px-3 border-1 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
);

const onClick = () => {
  emits('on:click', text.value);
};

watch(() => props.text, (newValue) => {
  text.value = newValue;
}, { immediate: true });

watch(() => props.spinner, (newValue) => {
  spinner.value = newValue;
}, { immediate: true });
</script>

<template>
  <button
    type="button"
    :value="text"
    :class="[
      ...[buttonClass],
      spinner ? 'spinner' : '',
    ]"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<style>
.spinner svg {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
