<template>
    <div class="mb-2">
      <label class="mb-3">{{ label }}</label>
      <div> 
        <label v-for="(option, index) in options" :key="index">
          <input 
            type="radio" 
            :value="option" 
            v-model="localModel" 
            @change="updateModel" 
             class="form-check-input mb-3"
          />
          {{ option }}
        </label>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
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

// Local model for two-way binding
const localModel = ref(props.modelValue);

// Watch for external changes to modelValue and update the local model
watch(() => props.modelValue, (newVal) => {
  localModel.value = newVal;
});

// Emit changes to parent
function updateModel() {
  emit('update:modelValue', localModel.value);
}
</script>

  