<template>
    <div>
    <div class="d-flex justify-content-between">
        <label class="form-label">{{ label }}</label>
        <button type="button" class="btn btn-primary btn-sm mt-2" @click="addItems"> Add </button>
    </div>
      <div v-for="(item, index) in items" :key="index" class="d-flex align-items-center mb-2">
        <input
          type="text"
          class="form-control me-2"
          v-model="items[index]"
          @input="emitUpdate"
          placeholder="Enter here"
        />
        <button type="button" class="btn btn-danger btn-sm" @click="removeItems(index)">Remove</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, defineEmits, defineProps } from 'vue';
  const props = defineProps({
    modelValue: {
      type: Array,
      required: true,
    },
    label: {
    type: String,
    required: true,
  },
  });
  const emit = defineEmits(['update:modelValue']);
  
  const items = ref([...props.modelValue]);
  console.log(items.value)
  
  watch(() => props.modelValue, (newVal) => {
    items.value = [...newVal];
  });
  
  function emitUpdate() {
    emit('update:modelValue', items.value);
  }
  
  function addItems() {
    items.value.push('');
    emitUpdate();
  }
  
  function removeItems(index) {
    items.value.splice(index, 1);
    emitUpdate();
  }
  </script>
  