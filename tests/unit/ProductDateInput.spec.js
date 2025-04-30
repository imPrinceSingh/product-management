import { mount } from '@vue/test-utils'
import FlatPickr from 'vue-flatpickr-component'
import ComponentUnderTest from '@/components/YourComponent.vue' // update the path

describe('DatePicker Component', () => {
  it('renders label correctly', () => {
    const wrapper = mount(ComponentUnderTest, {
      props: {
        label: 'Pick a Date',
        modelValue: ''
      }
    })
    expect(wrapper.find('label').text()).toBe('Pick a Date')
  })

  it('sets the correct default date', () => {
    const wrapper = mount(ComponentUnderTest, {
      props: {
        label: 'Pick a Date',
        modelValue: '2024-04-15'
      }
    })
    const flatpickrComponent = wrapper.findComponent(FlatPickr)
    expect(flatpickrComponent.props('modelValue')).toBe('2024-04-15')
  })

  it('emits update:modelValue when date changes', async () => {
    const wrapper = mount(ComponentUnderTest, {
      props: {
        label: 'Pick a Date',
        modelValue: ''
      }
    })

    const flatpickrComponent = wrapper.findComponent(FlatPickr)
    await flatpickrComponent.vm.$emit('update:modelValue', '2024-05-01')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['2024-05-01'])
  })
})
