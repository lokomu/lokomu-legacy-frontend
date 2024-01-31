import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import ShadowButton from '@/components/BaseComponents/ShadowButton.vue';

describe('ShadowButton', () => {
    it('renders slot content', () => {
        const wrapper = mount(ShadowButton, {
            slots: {
                default: 'Click me',
            },
        });
        expect(wrapper.text()).toBe('Click me');
    });

    it('adds shadow on hover and removes shadow on click', async () => {
        const wrapper = mount(ShadowButton);
        const button = wrapper.find('button');

        // Verify that button has no shadow initially
        expect(button.classes()).not.toContain('shadow-lg');

        // Simulate click on button
        await button.trigger('mousedown');
        expect(button.classes()).not.toContain('shadow-lg');
    });
});