<template>
  <div>
    <label class="mb-2">{{ label }}</label>
    <select v-bind="$attrs" :value="modelValue" @input="updateModel" class="form-select mb-3">
      <option v-for="(option, index) in options" :key="index" :value="option"  >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    modelValue: {
      type: [String, Number, Object],
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
  function updateModel(event) {
      emit("update:modelValue", event.target.value);
    }

</script>
