import { shallowMount } from "@vue/test-utils";
import NewPassword from "@/components/UserAuthComponents/NewPassword.vue";
import { describe, expect, it, beforeEach } from "vitest";

describe("NewPasswordForm component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(NewPassword, {});
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("is instantiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
