<script setup>
import { useProductFormStore } from '../stores/productFormStore'
import ProductInputField from './ProductInputField.vue'
import ProductSelectField from './ProductSelectField.vue'
import ProductTextArea from './ProductTextArea.vue'
import ProductRadioField from './ProductRadioField.vue'
import ProductCheckboxGroup from './ProductCheckboxGroup.vue'
import ProductFileUpload from './ProductFileUpload.vue'
import ProductDateInput from './ProductDateInput.vue'
import ProductMultiInput from './ProductMultiInput.vue'
import { useToast } from "vue-toastification";

const toast = useToast();
const store = useProductFormStore()
const form = store.form

const handleSubmit = () => {
  if(form.price<=0) return toast.error('Invalid Price Value')
  if(form.stock<=0) return toast.error('Invalid Stock Value')
  console.log(form.discountValue)
  if(form.discountType==='Percentage') {
    if(form.discountValue<0 || form.discountValue>100) return toast.error('Invalid Discount Value')
    }
  
  console.log(form)
}
</script>

<template>
  <div class="mb-4">
    <h3 class="card-title">Product Form</h3>
  </div>
  <form @submit.prevent="handleSubmit">
    <div class="row">
      <div class="col-12 col-md-4">
        
        <ProductInputField label="Product ID" :modelValue="form.productId" :readonly="true" />
        <ProductInputField label="Product Name" v-model="form.productName" required />
        <ProductSelectField label="Product Category" v-model="form.category" :options="store.categories" required />
        <ProductInputField v-if="form.category === 'Other'" label="Custom Category" v-model="form.customCategory" />
        <ProductSelectField v-if="form.category" label="Sub-Category" v-model="form.subCategory"
          :options="store.subCategories[form.category]" required/>
        <ProductRadioField v-if="form.subCategory" label="Product Type" v-model="form.productType"
          :options="store.productTypes" />
        <ProductInputField label="Brand Name" v-model="form.brand" required />
        <ProductInputField v-if="form.category === 'Electronics'" label="Model Number" v-model="form.modelNumber"
          required />
        <ProductTextArea label="Product Description" v-model="form.description" required />
        <ProductTextArea label="Short Description" v-model="form.shortDescription" maxlength="150" required />
      </div>

      <div class="col-12 col-md-4">
        <ProductInputField label="Price" v-model.number="form.price" type="number" required />
        <ProductSelectField label="Currency" v-model="form.currency" :options="store.currencies" required />
        <ProductRadioField label="Discount Type" v-model="form.discountType" :options="store.discountTypes" />
        <ProductInputField v-if="form.discountType !== 'None'" label="Discount Value"
          v-model.number="form.discountValue" type="number" />
        <ProductSelectField label="Tax Category" v-model="form.taxCategory" :options="store.taxCategories" required />
        <ProductInputField label="Length" v-model.number="form.length" type="number" />
        <ProductInputField label="Width" v-model.number="form.width" type="number" />
        <ProductInputField label="Height" v-model.number="form.height" type="number" />
        <ProductSelectField label="Unit" v-model="form.dimensionUnit" :options="store.dimensionUnits" />
      </div>

      <div class="col-12 col-md-4">
        <ProductInputField label="Stock Quantity" v-model.number="form.stock" type="number" required />
        <ProductInputField label="Product Weight" v-model.number="form.weight" type="number" />
        <ProductCheckboxGroup
        v-if="form.category === 'Clothing' && ['Tops', 'Bottoms', 'Footwear'].includes(form.subCategory)"
        label="Available Sizes" v-model="form.sizes" :options="store.getSizeOptions" />
        <ProductInputField v-if="['Clothing', 'Home & Garden'].includes(form.category)" label="Material"
        v-model="form.material" />
        <div class="d-flex ">
          
          <ProductCheckboxGroup v-if="['Clothing', 'Electronics'].includes(form.category)" label="Available Colors"
          v-model="form.colors" :options="store.colors" class="col-6"/>
          <ProductCheckboxGroup label="Shipping Options" v-model="form.shipping"
          :options="store.filteredShippingOptions" />
        </div>
          <ProductMultiInput  label="Product Features" v-model="form.features" />
          <ProductMultiInput  label="Product Tags" v-model="form.tags" />
        <ProductSelectField label="Return Policy" v-model="form.returnPolicy" :options="store.returnPolicies"
          required />
        <ProductInputField v-if="['Electronics', 'Home & Garden'].includes(form.category)"
          label="Warranty Period (months)" v-model.number="form.warrantyPeriod" type="number" />
        <ProductFileUpload label="Product Images" v-model="form.productImages"/>
        <ProductRadioField label="Publication Status" v-model="form.status"
          :options="['Draft', 'Published', 'Scheduled']" />
        <ProductDateInput v-if="form.status === 'Scheduled'" label="Publication Date" v-model="form.publicationDate" />
      </div>
    </div>
    <button type="submit">Submit</button>
  </form>
</template>
