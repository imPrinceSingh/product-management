import { mount } from '@vue/test-utils'
import ProductMultiInput from '@/components/ProductMultiInput.vue'

describe('ProductMultiInput.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(ProductMultiInput, {
      props: {
        label: 'Product Features',
        modelValue: ['Feature 1', 'Feature 2'], // Initialize with two features
      },
    })
  })

  it('renders the label correctly', () => {
    expect(wrapper.text()).toContain('Product Features')
  })

  it('renders the initial items from modelValue', () => {
    const inputFields = wrapper.findAll('input')
    expect(inputFields.length).toBe(2) // Two input fields should be rendered initially
    expect(inputFields[0].element.value).toBe('Feature 1')
    expect(inputFields[1].element.value).toBe('Feature 2')
  })

  it('emits updated model value when input is changed', async () => {
    const input = wrapper.findAll('input').at(0)
    await input.setValue('Updated Feature 1')

    // Check if the update:modelValue event is emitted with the updated values
    expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([ 'Updated Feature 1', 'Feature 2' ])
  })

  it('adds an empty input field when "Add" button is clicked', async () => {
    const addButton = wrapper.find('button.btn-primary')
    await addButton.trigger('click')

    const inputFields = wrapper.findAll('input')
    expect(inputFields.length).toBe(3) // One more input field should be added
    expect(inputFields[2].element.value).toBe('') // The new input field should be empty
  })

  it('removes the item when "Remove" button is clicked', async () => {
    const removeButton = wrapper.findAll('button.btn-danger').at(0)
    await removeButton.trigger('click')

    const inputFields = wrapper.findAll('input')
    expect(inputFields.length).toBe(1) // One input field should be removed
    expect(inputFields[0].element.value).toBe('Feature 2') // The remaining input field should have the second feature value
  })

  it('emits updated model value when item is removed', async () => {
    const removeButton = wrapper.findAll('button.btn-danger').at(0)
    await removeButton.trigger('click')

    expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([ 'Feature 2' ])
  })

  it('syncs modelValue prop with the internal items list', async () => {
    await wrapper.setProps({ modelValue: ['New Feature 1', 'New Feature 2'] })

    const inputFields = wrapper.findAll('input')
    expect(inputFields.length).toBe(2)
    expect(inputFields[0].element.value).toBe('New Feature 1')
    expect(inputFields[1].element.value).toBe('New Feature 2')
  })
})
