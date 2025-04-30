import { mount } from '@vue/test-utils';
import CheckboxGroup from '@/components/CheckboxGroup.vue'; // Adjust path as needed

describe('CheckboxGroup.vue', () => {
  const label = 'Select Options';
  const options = ['Red', 'Green', 'Blue'];
  const modelValue = ['Green'];

  it('renders label and all checkboxes', () => {
    const wrapper = mount(CheckboxGroup, {
      props: { label, options, modelValue },
    });

    // Check label
    expect(wrapper.text()).toContain(label);

    // Check checkboxes count
    const checkboxes = wrapper.findAll('input[type="checkbox"]');
    expect(checkboxes).toHaveLength(options.length);

    // Check which checkbox is checked
    expect(checkboxes[1].element.checked).toBe(true); // Green
    expect(checkboxes[0].element.checked).toBe(false); // Red
  });

  it('emits update:modelValue on change', async () => {
    const wrapper = mount(CheckboxGroup, {
      props: { label, options, modelValue },
    });

    const redCheckbox = wrapper.findAll('input[type="checkbox"]')[0];
    await redCheckbox.setChecked();

    // Assert emitted with 'Green' (already selected) and now 'Red'
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    const updatedValue = wrapper.emitted('update:modelValue')[0][0];
    expect(updatedValue).toEqual(['Green', 'Red']);
  });

  it('removes selected option when unchecked', async () => {
    const wrapper = mount(CheckboxGroup, {
      props: { label, options, modelValue },
    });

    const greenCheckbox = wrapper.findAll('input[type="checkbox"]')[1];
    await greenCheckbox.setChecked(false);

    const updatedValue = wrapper.emitted('update:modelValue')[0][0];
    expect(updatedValue).toEqual([]); // 'Green' removed
  });
});
