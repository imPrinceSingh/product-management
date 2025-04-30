import { mount } from '@vue/test-utils'
import ProductRadioField from '@/components/ProductRadioField.vue'

describe('ProductRadioField.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(ProductRadioField, {
      props: {
        label: 'Select Option',
        modelValue: 'Option 1',
        options: ['Option 1', 'Option 2', 'Option 3'],
      },
    })
  })

  it('renders the label correctly', () => {
    expect(wrapper.text()).toContain('Select Option')
  })

  it('renders the options correctly', () => {
    const options = wrapper.findAll('label')
    expect(options.length).toBe(3)
    expect(options[0].text()).toContain('Option 1')
    expect(options[1].text()).toContain('Option 2')
    expect(options[2].text()).toContain('Option 3')
  })

  it('sets the correct radio button as checked based on modelValue', () => {
    const radioButtons = wrapper.findAll('input[type="radio"]')
    expect(radioButtons[0].element.checked).toBe(true)  // Option 1 should be selected
    expect(radioButtons[1].element.checked).toBe(false) // Option 2 should not be selected
    expect(radioButtons[2].element.checked).toBe(false) // Option 3 should not be selected
  })

  it('emits the correct modelValue when an option is selected', async () => {
    const radioButton = wrapper.findAll('input[type="radio"]').at(1) // Selecting 'Option 2'
    await radioButton.setChecked()

    expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['Option 2'])
  })

  it('updates the selected radio button when modelValue changes from parent', async () => {
    await wrapper.setProps({ modelValue: 'Option 3' })
    const radioButtons = wrapper.findAll('input[type="radio"]')

    expect(radioButtons[0].element.checked).toBe(false)
    expect(radioButtons[1].element.checked).toBe(false)
    expect(radioButtons[2].element.checked).toBe(true)  // Option 3 should be selected
  })

  it('does not emit anything if the same option is selected again', async () => {
    const radioButton = wrapper.findAll('input[type="radio"]').at(0) // Selecting 'Option 1'
    await radioButton.setChecked()

    // The emitted event should only be triggered when the selected value changes
    expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['Option 1'])

    await radioButton.setChecked() // Click the same option again
    expect(wrapper.emitted()['update:modelValue'].length).toBe(1) // Should not emit again
  })
})
