import { shallowMount } from "@vue/test-utils";
import FooterBar from "@/components/NavigationComponents/FooterBar.vue";
import { describe, expect, it} from "vitest";

describe("FooterBar component", () => {
  let wrapper = shallowMount(FooterBar);

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("is instantiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
