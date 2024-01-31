import { mount } from "@vue/test-utils";
import ItemImage from "@/components/ItemComponents/ItemImage.vue";
import { describe, expect, it, beforeEach } from "vitest";

describe("FormImageDisplay component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ItemImage);
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("is instantiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
