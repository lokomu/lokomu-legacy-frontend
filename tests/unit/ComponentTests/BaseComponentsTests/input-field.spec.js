import { mount } from '@vue/test-utils';
import InputField from '@/components/BaseComponents/InputField.vue';
import {describe, it, expect} from "vitest";

describe('InputField', () => {

    const wrapper = mount(InputField, {
        props: {
            modelValue: '',
            isValid: null,
        },
    });

    it('applies the correct classes based on isValid prop', async () => {
        // check that the base classes are applied when isValid is null
        expect(wrapper.classes()).toContain('bg-gray-100');

        await wrapper.setProps({ isValid: true });
        expect(wrapper.classes()).toContain('bg-green-50');

        await wrapper.setProps({ isValid: false });
        expect(wrapper.classes()).toContain('bg-red-50');
    });

    it("renders correctly", () => {
        expect(wrapper.element).toMatchSnapshot();
    });

    it("is instantiated", () => {
        expect(wrapper.exists()).toBeTruthy();
    });
});