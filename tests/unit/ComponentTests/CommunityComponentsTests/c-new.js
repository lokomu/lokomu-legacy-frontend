import { shallowMount } from "@vue/test-utils";
import CNew from "@/components/CommunityComponents/CNew.vue";
import { describe, expect, it, beforeEach } from "vitest";

describe("CreateNewCommunity elements rendering", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(CNew);
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
