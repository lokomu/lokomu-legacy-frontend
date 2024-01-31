import { shallowMount } from "@vue/test-utils";
import FAB from "@/components/BaseComponents/FAB";
import { describe, expect, it} from "vitest";

describe("FAB component", () => {
  let wrapper = shallowMount(FAB);

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("is instantiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
