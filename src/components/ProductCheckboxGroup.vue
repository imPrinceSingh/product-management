<template>
  <div>
    <label class="form-label">{{ label }}</label>
    <div>
      <label
        v-for="(option, index) in options"
        :key="index"
        class="form-check-label d-block"
      >
        <input
          class="form-check-input me-2"
          type="checkbox"
          :value="option"
          :checked="modelValue.includes(option)"
          @change="toggleOption(option)"
        />
        {{ option }}
      </label>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

function toggleOption(option) {
  const newValue = [...props.modelValue];
  const index = newValue.indexOf(option);
  if (index === -1) {
    newValue.push(option);
  } else {
    newValue.splice(index, 1);
  }
  emit('update:modelValue', newValue);
}
</script>

