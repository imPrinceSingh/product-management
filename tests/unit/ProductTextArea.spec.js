const { mount } = require('@vue/test-utils');
const ProductTextArea = require('../../src/components/ProductTextArea.vue');

describe('ProductTextArea.vue', () => {
  it('renders label', () => {
    const wrapper = mount(ProductTextArea, {
      props: {
        label: 'Name',
        modelValue: '',
      },
    });
    expect(wrapper.text()).toContain('Name');
  });

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(ProductTextArea, {
      props: {
        label: 'Name',
        modelValue: '',
      },
    });

    const input = wrapper.find('input');
    await input.setValue('Test Product');

    expect(wrapper.emitted()['update:modelValue']).toBeTruthy();
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['Test Product']);
  });
});
