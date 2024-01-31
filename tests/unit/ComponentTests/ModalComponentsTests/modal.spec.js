import { shallowMount } from "@vue/test-utils";
import Modal from "@/components/BaseComponents/Modal";
import { describe, expect, it} from "vitest";

describe("Modal component", () => {
  let wrapper = shallowMount(Modal);

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("is instantiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
