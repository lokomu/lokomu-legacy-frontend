import { mount } from "@vue/test-utils";
import LanguageSwitcher from "@/components/BaseComponents/LanguageSwitcher.vue";
import {describe, it, expect} from "vitest";

describe("LanguageSwitcher", () => {
    const wrapper = mount(LanguageSwitcher);

    it("is instantiated", () => {
        expect(wrapper.exists()).toBeTruthy();
    });
});