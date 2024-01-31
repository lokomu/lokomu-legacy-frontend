import { shallowMount } from "@vue/test-utils";
import Switch from "@/components/BaseComponents/Switch.vue";
import { describe, expect, it} from "vitest";

describe("AddSwitch component", () => {
  let wrapper = shallowMount(Switch);

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("is instantiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
