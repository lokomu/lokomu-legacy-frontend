import { mount } from "@vue/test-utils";
import TripleDotButton from "@/components/BaseComponents/TripleDotButton.vue";
import { describe, expect, it, beforeEach } from "vitest";

describe("TripleDotButton component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(TripleDotButton);
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("is instantiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
