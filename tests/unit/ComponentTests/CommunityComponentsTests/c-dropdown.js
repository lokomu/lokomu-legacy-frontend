import { shallowMount } from "@vue/test-utils";
import CDropdown from "@/components/CommunityComponents/CDropdown.vue";
import { describe, beforeEach } from "vitest";
import { vi, expect, it } from "vitest";

describe("CommunityHamburger elements rendering", () => {
  let wrapper;

  vi.mock("vue-router", () => ({
    useRoute: () => ({
      params: { communityID: 1 },
    }),
  }));

  beforeEach(() => {
    wrapper = shallowMount(CDropdown, {});
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("is instantiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
