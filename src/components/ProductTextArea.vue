<template>
  <div>
    <label>{{ label }}</label>
    <textarea
      v-bind="$attrs"
      :value="modelValue"
      @input="updateModel"
       class="form-control mb-3"
    ></textarea>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

function updateModel(event) {
  emit('update:modelValue', event.target.value);
}
</script>

