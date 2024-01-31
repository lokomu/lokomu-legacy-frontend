import { shallowMount } from "@vue/test-utils";
import ThemeToggler from "@/components/BaseComponents/ThemeToggler";
import { describe, expect, it, beforeEach } from "vitest";

describe("ThemeToggler component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(ThemeToggler);
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("is instantiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
