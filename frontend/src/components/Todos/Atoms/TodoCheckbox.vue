<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['change']);

const isChecked = ref(props.active);
const disabled = ref(props.disabled);

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emits('change', target.checked);
};

watch(() => props.active, (newValue) => {
  isChecked.value = newValue;
}, { immediate: true });

watch(() => props.disabled, (newValue) => {
  disabled.value = newValue;
}, { immediate: true });
</script>

<template>
  <div class="flex items-center">
    <input
      type="checkbox"
      :disabled="disabled"
      :checked="isChecked"
      @change="handleChange"
      class="form-checkbox h-5 w-5 focus:ring-opacity-50"
      :class="{
        'bg-blue-500 border-blue-500 opacity-50': isChecked,
        'bg-gray-200 border-gray-300': !isChecked,
        'cursor-not-allowed opacity-50': disabled,
      }"
    />
  </div>
</template>
