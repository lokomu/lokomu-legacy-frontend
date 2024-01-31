import { mount } from '@vue/test-utils';
import ActionMessage from '@/components/BaseComponents/ActionMessage.vue';
import ColorButton from '@/components/BaseComponents/ColorButton.vue';
import {describe, it, expect} from "vitest";

describe('ActionMessage component', () => {
    const wrapper = mount(ActionMessage, {
        props: {
            title: 'Test Title',
            message: 'Test Message',
            actionText: 'Test Action',
        },
        global: {
            components: {
                ColorButton,
            },
        },
    });

    it('renders title, message, and action buttons correctly', () => {
        expect(wrapper.find('h3').text()).toBe('Test Title');
        expect(wrapper.find('p').text()).toBe('Test Message');
        expect(wrapper.findAllComponents(ColorButton)).toHaveLength(2);
        expect(wrapper.findComponent({ name: 'ColorButton', props: { text: 'Test Action' } })).toBeTruthy();
        expect(wrapper.find('#cancel-button')).toBeTruthy();
    });

    it('emits "close" event when close button is clicked', async () => {
        await wrapper.find('#cancel-button').trigger('click');
        expect(wrapper.emitted().close).toBeTruthy();
    });

    it('emits "action" event when action button is clicked', async () => {
        await wrapper.findComponent({ name: 'ColorButton', props: { text: 'Test Action' } }).trigger('click');
        expect(wrapper.emitted().action).toBeTruthy();
    });

    it("renders correctly", () => {
        expect(wrapper.element).toMatchSnapshot();
    });

    it("is instantiated", () => {
        expect(wrapper.exists()).toBeTruthy();
    });
});