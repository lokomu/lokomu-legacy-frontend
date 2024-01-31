import { shallowMount } from "@vue/test-utils";
import RegisterFormComponent from "@/components/UserAuthComponents/RegisterForm";
import { describe, expect, it, beforeEach } from "vitest";

describe("RegisterFormComponent", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(RegisterFormComponent, {});
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("is instantiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
