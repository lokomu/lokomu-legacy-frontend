import { mount } from '@vue/test-utils';
import ColorButton from '@/components/BaseComponents/ColorButton';
import {describe, it, expect} from "vitest";

describe('ColorButton', () => {
  const wrapper = mount(ColorButton, {
    props: {
      text: 'Test Button',
    },
  });

  it('renders with default props', () => {
    expect(wrapper.find('button').text()).toBe('Test Button');
    expect(wrapper.classes()).toContain('from-floyd-400');
    expect(wrapper.classes()).toContain('via-floyd-600');
    expect(wrapper.classes()).toContain('to-floyd-700');
    expect(wrapper.classes()).toContain('focus:ring-floyd-300');
  });

  it('renders with custom button color', () => {
    const wrapper = mount(ColorButton, {
      props: {
        text: 'Test Button',
        buttonColor: 'red',
      },
    });
    expect(wrapper.classes()).toContain('from-pink-500');
    expect(wrapper.classes()).toContain('via-pink-600');
    expect(wrapper.classes()).toContain('to-pink-700');
    expect(wrapper.classes()).toContain('focus:ring-pink-300');
  });

  it('emits click event when clicked', async () => {
    await wrapper.trigger('click');
    expect(wrapper.emitted().click).toBeTruthy();
  });
  
  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("is instantiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});