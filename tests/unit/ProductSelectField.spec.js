import { mount } from '@vue/test-utils'
import SelectField from '@/components/SelectField.vue'

describe('SelectField.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(SelectField, {
      props: {
        label: 'Choose an option',
        modelValue: 'Option 1',
        options: ['Option 1', 'Option 2', 'Option 3'],
      },
    })
  })

  it('renders the label correctly', () => {
    expect(wrapper.text()).toContain('Choose an option')
  })

  it('renders the options correctly', () => {
    const options = wrapper.findAll('option')
    expect(options.length).toBe(3)
    expect(options[0].text()).toContain('Option 1')
    expect(options[1].text()).toContain('Option 2')
    expect(options[2].text()).toContain('Option 3')
  })

  it('sets the correct option as selected based on modelValue', () => {
    const selectElement = wrapper.find('select')
    expect(selectElement.element.value).toBe('Option 1')  // Option 1 should be selected
  })

  it('emits the correct modelValue when an option is selected', async () => {
    const selectElement = wrapper.find('select')
    await selectElement.setValue('Option 2')  // Select 'Option 2'

    expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['Option 2'])
  })

  it('updates the selected option when modelValue changes from parent', async () => {
    await wrapper.setProps({ modelValue: 'Option 3' })
    const selectElement = wrapper.find('select')

    expect(selectElement.element.value).toBe('Option 3')  // Option 3 should be selected now
  })

  it('does not emit anything if the same option is selected again', async () => {
    const selectElement = wrapper.find('select')
    await selectElement.setValue('Option 2')  // Select 'Option 2'

    // The emitted event should only be triggered when the selected value changes
    expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['Option 2'])

    await selectElement.setValue('Option 2')  // Select the same option again
    expect(wrapper.emitted()['update:modelValue'].length).toBe(1) // Should not emit again
  })
})
