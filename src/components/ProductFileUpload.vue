<template>
  <div>
    <label>{{ label }}</label>
    <input type="file" @change="onFileChange" multiple class="form-control mb-3" accept=".jpg,.jpeg,.png"/>
    <div v-if="error" class="text-danger fst-italic fs-13">*{{ error }}</div>
    
    <div v-if="previews.length">
      <h6>Image Previews:</h6>
      <div v-for="(image, index) in previews" :key="index" class="mb-2">
        <img :src="image" alt="preview" width="100" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps({
  label: { type: String, required: true },
  modelValue: { type: Array, default: () => [] }, // Accept files array
});

const emit = defineEmits(['update:modelValue']);
const previews = ref([]);
const error = ref(null)

function onFileChange(event) {
  const maxSize = 2 * 1024 * 1024; // 2 MB
  const validFiles = [];
  const files = Array.from(event.target.files);
  previews.value = [];

  // Emit files to parent
  emit('update:modelValue', files);

  // Generate previews
  files.forEach(file => {
    if (file.size <= maxSize) {
      validFiles.push(file);
      error.value=''
    } else {
      error.value= `${file.name} is too large. Max size is 2 MB.`;
      return 
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      previews.value.push(e.target.result);
    };
    reader.readAsDataURL(file);
  });
}
</script>
<style scoped>
.fs-13 {
  font-size: 13px;
}
</style>