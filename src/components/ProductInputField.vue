<template>
  <div>
    <label class="form-label">{{ label }}</label>
    <input v-bind="$attrs" :value="modelValue" @input="updateModel" class="form-control mb-3" />
    <div v-if="error" class="text-danger fst-italic fs-13">*{{ error }}</div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';

let error = ref(null)

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

function validateInput(event) {
  const num = parseFloat(event.target.value);

  if (props.label === 'Price') {
    if (isNaN(num) || num <= 0) {
      error.value = 'Price must be a positive number';
    }
  } else if (props.label === 'Stock Quantity') {
    if (!Number.isInteger(num) || num < 0) {
      error.value = 'Stock Quantity must be a non-negative integer';
    }
  }
  else if (props.label === 'Discount Value') {
    if (num < 0 || num > 100) {
      error.value = 'Discount percentage must be between 0 and 100';
    }
  }

  error.value = '';
}

function updateModel(event) {
  validateInput(event);
  emit('update:modelValue', event.target.value);
}

</script>
<style scoped>
.fs-13 {
  font-size: 13px;
}
</style>
