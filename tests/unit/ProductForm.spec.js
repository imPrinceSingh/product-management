import { mount } from '@vue/test-utils'
import ProductForm from '@/components/ProductForm.vue'
import { useToast } from 'vue-toastification'
import { createStore } from 'pinia'
import { useProductFormStore } from '@/stores/productFormStore'

jest.mock('vue-toastification')

describe('ProductForm.vue', () => {
  let wrapper
  let store

  beforeEach(() => {
    // Set up mock store
    store = createStore({
      id: 'productFormStore',
      state: {
        form: {
          productId: '123',
          productName: '',
          category: '',
          price: 0,
          stock: 0,
          discountValue: 0,
          discountType: 'Percentage',
          subCategory: '',
          productType: '',
          brand: '',
          modelNumber: '',
          description: '',
          shortDescription: '',
          currency: '',
          taxCategory: '',
          length: 0,
          width: 0,
          height: 0,
          dimensionUnit: '',
          weight: 0,
          sizes: [],
          colors: [],
          shipping: [],
          features: [],
          tags: [],
          returnPolicy: '',
          warrantyPeriod: 0,
          productImages: [],
          status: 'Draft',
          publicationDate: '',
        },
        categories: ['Electronics', 'Clothing', 'Home & Garden'],
        subCategories: {
          Electronics: ['Mobile', 'Laptop'],
          Clothing: ['Tops', 'Bottoms'],
        },
        currencies: ['USD', 'EUR'],
        taxCategories: ['Standard', 'Reduced'],
        discountTypes: ['Percentage', 'None'],
        dimensionUnits: ['cm', 'inches'],
        colors: ['Red', 'Blue'],
        returnPolicies: ['30 Days', '60 Days'],
        filteredShippingOptions: ['Free', 'Paid'],
      },
    })

    // Mount the component
    wrapper = mount(ProductForm, {
      global: {
        plugins: [store],
      },
    })
  })

  it('shows error toast when price is less than or equal to 0', async () => {
    store.form.price = -1
    const toastSpy = jest.spyOn(useToast(), 'error')

    await wrapper.find('form').trigger('submit.prevent')

    expect(toastSpy).toHaveBeenCalledWith('Invalid Price Value')
  })

  it('shows error toast when stock is less than or equal to 0', async () => {
    store.form.price = 100
    store.form.stock = -1
    const toastSpy = jest.spyOn(useToast(), 'error')

    await wrapper.find('form').trigger('submit.prevent')

    expect(toastSpy).toHaveBeenCalledWith('Invalid Stock Value')
  })

  it('shows error toast when discountValue is not between 0 and 100 for Percentage discount type', async () => {
    store.form.price = 100
    store.form.stock = 10
    store.form.discountType = 'Percentage'
    store.form.discountValue = 150
    const toastSpy = jest.spyOn(useToast(), 'error')

    await wrapper.find('form').trigger('submit.prevent')

    expect(toastSpy).toHaveBeenCalledWith('Invalid Discount Value')
  })

  it('does not show error toast when form is valid', async () => {
    store.form.price = 100
    store.form.stock = 10
    store.form.discountType = 'Percentage'
    store.form.discountValue = 50
    const toastSpy = jest.spyOn(useToast(), 'error')

    await wrapper.find('form').trigger('submit.prevent')

    expect(toastSpy).not.toHaveBeenCalled()
  })
})
