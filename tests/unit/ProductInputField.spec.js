import { mount } from '@vue/test-utils'
import ProductInputField from '@/components/ProductInputField.vue'

describe('ProductInputField.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(ProductInputField, {
      props: {
        label: 'Price',
        modelValue: 10, // Initialize with some valid model value
      },
    })
  })

  it('renders the label correctly', () => {
    expect(wrapper.text()).toContain('Price')
  })

  it('emits the correct value when input is updated', async () => {
    const input = wrapper.find('input')
    await input.setValue(25) // Change the input value

    expect(wrapper.emitted()['update:modelValue']).toBeTruthy() // Check if the event was emitted
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([25]) // Check if the correct value was emitted
  })

  it('shows an error when a non-positive price is entered', async () => {
    const input = wrapper.find('input')
    await input.setValue(-5)

    // Check if the error message is displayed
    expect(wrapper.text()).toContain('Price must be a positive number')
  })

  it('shows an error when a non-numeric price is entered', async () => {
    const input = wrapper.find('input')
    await input.setValue('abc')

    // Check if the error message is displayed
    expect(wrapper.text()).toContain('Price must be a positive number')
  })

  it('does not show an error when a valid price is entered', async () => {
    const input = wrapper.find('input')
    await input.setValue(50)

    // Check if no error message is shown
    expect(wrapper.text()).not.toContain('Price must be a positive number')
  })

  it('shows an error for stock quantity if a negative integer is entered', async () => {
    wrapper.setProps({ label: 'Stock Quantity' })
    const input = wrapper.find('input')
    await input.setValue(-5)

    // Check if the error message is displayed for stock quantity
    expect(wrapper.text()).toContain('Stock Quantity must be a non-negative integer')
  })

  it('shows an error for stock quantity if a non-integer value is entered', async () => {
    wrapper.setProps({ label: 'Stock Quantity' })
    const input = wrapper.find('input')
    await input.setValue(5.5)

    // Check if the error message is displayed for stock quantity
    expect(wrapper.text()).toContain('Stock Quantity must be a non-negative integer')
  })

  it('does not show an error for valid stock quantity', async () => {
    wrapper.setProps({ label: 'Stock Quantity' })
    const input = wrapper.find('input')
    await input.setValue(10)

    // Check if no error message is shown for valid stock quantity
    expect(wrapper.text()).not.toContain('Stock Quantity must be a non-negative integer')
  })

  it('shows an error for discount value if it is less than 0 or greater than 100', async () => {
    wrapper.setProps({ label: 'Discount Value' })
    const input = wrapper.find('input')

    await input.setValue(-10)
    expect(wrapper.text()).toContain('Discount percentage must be between 0 and 100')

    await input.setValue(150)
    expect(wrapper.text()).toContain('Discount percentage must be between 0 and 100')
  })

  it('does not show an error for valid discount value', async () => {
    wrapper.setProps({ label: 'Discount Value' })
    const input = wrapper.find('input')
    await input.setValue(50)

    expect(wrapper.text()).not.toContain('Discount percentage must be between 0 and 100')
  })
})
