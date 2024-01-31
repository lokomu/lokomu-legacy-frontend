import { mount } from '@vue/test-utils';
import LandingPage from '@/components/BaseComponents/LandingPage.vue';
import {describe, it, expect} from "vitest";

describe('LandingPage', () => {
    let wrapper = mount(LandingPage);

    it("renders correctly", () => {
        expect(wrapper.element).toMatchSnapshot();
    });

    it("is instantiated", () => {
        expect(wrapper.exists()).toBeTruthy();
    });
});