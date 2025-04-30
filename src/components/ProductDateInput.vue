<template>
    <div class="mb-3">
      <label class="form-label">{{ label }}</label>
      <flat-pickr
        v-model="selectedDate"
        :config="config"
        placeholder="Select a date"
        class="form-control"
      />
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits, ref, watch } from 'vue';
  import FlatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';
  
  const props = defineProps({
    modelValue: { type: [String, Date], default: '' },
    label: { type: String, required: true }
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const selectedDate = ref(props.modelValue);
  
  // Emit when date changes
  watch(selectedDate, (newVal) => {
    emit('update:modelValue', newVal);
  });
  
  // Sync when parent changes
  watch(() => props.modelValue, (newVal) => {
    selectedDate.value = newVal;
  });
  
  const config = {
    dateFormat: 'Y-m-d',
    maxDate: new Date()

  };
  </script>
  