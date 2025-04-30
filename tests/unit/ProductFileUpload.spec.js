import { mount } from '@vue/test-utils'
import ProductFileUpload from '@/components/ProductFileUpload.vue'

describe('ProductFileUpload.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(ProductFileUpload, {
      props: {
        label: 'Product Images',
      },
    })
  })

  it('renders the label correctly', () => {
    expect(wrapper.text()).toContain('Product Images')
  })

  it('emits the selected files to the parent component', async () => {
    const file = new File(['dummy content'], 'test.jpg', { type: 'image/jpeg' })
    const input = wrapper.find('input[type="file"]')

    await input.setFiles([file])

    expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([file])
  })

  it('shows an error message if the file size is too large', async () => {
    const largeFile = new File(['dummy content'], 'large-file.jpg', { type: 'image/jpeg', size: 3 * 1024 * 1024 })
    const input = wrapper.find('input[type="file"]')

    await input.setFiles([largeFile])

    expect(wrapper.text()).toContain('large-file.jpg is too large. Max size is 2 MB.')
  })

  it('does not show error message if the file size is within the limit', async () => {
    const smallFile = new File(['dummy content'], 'small-file.jpg', { type: 'image/jpeg', size: 1 * 1024 * 1024 })
    const input = wrapper.find('input[type="file"]')

    await input.setFiles([smallFile])

    expect(wrapper.text()).not.toContain('is too large')
  })

  it('displays image previews for valid files', async () => {
    const file1 = new File(['dummy content'], 'image1.jpg', { type: 'image/jpeg', size: 1 * 1024 * 1024 })
    const file2 = new File(['dummy content'], 'image2.jpg', { type: 'image/jpeg', size: 1 * 1024 * 1024 })
    const input = wrapper.find('input[type="file"]')

    await input.setFiles([file1, file2])

    const previews = wrapper.findAll('img')
    expect(previews.length).toBe(2)
    expect(previews[0].attributes('src')).toContain('data:image/jpeg;base64')
    expect(previews[1].attributes('src')).toContain('data:image/jpeg;base64')
  })

  it('does not display previews if no files are selected', () => {
    const previews = wrapper.findAll('img')
    expect(previews.length).toBe(0)
  })
})
