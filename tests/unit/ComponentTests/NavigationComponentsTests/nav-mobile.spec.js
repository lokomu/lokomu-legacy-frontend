import { shallowMount } from "@vue/test-utils";
import NavbarMobile from "@/components/NavigationComponents/NavMobile.vue";
import { describe, expect, it, beforeEach } from "vitest";

describe("NavBarMobile component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(NavbarMobile);
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("is instantiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
