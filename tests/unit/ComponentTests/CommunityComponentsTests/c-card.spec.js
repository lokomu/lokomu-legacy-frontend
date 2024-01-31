import { mount } from "@vue/test-utils";
import CCard from "@/components/CommunityComponents/CCard.vue";
import {describe, it, expect} from "vitest";
import CommunityIcon from "@/components/IconComponents/CommunityIcon";

describe("CCard", () => {
  const wrapper = mount(CCard, {
    props: {
      communityName: "Test Community",
    },
    global: {
      components: {
        CommunityIcon
      },
    },
  });

  it("renders community name", async () => {
    const communityName = wrapper.find(".font-semibold");
    expect(communityName.text()).toBe("Test Community");
  });

  it("renders CommunityIcon if community image not provided", async () => {
    const communityIcon = wrapper.findComponent(CommunityIcon);
    expect(communityIcon.exists()).toBe(true);
  });

  it("renders community image if provided", async () => {
    const wrapper = mount(CCard, {
      props: {
        communityName: "Test Community",
        communityImage: "test-image.jpg"
      },
      global: {
        components: {
          CommunityIcon
        },
      },
    });

    const img = wrapper.find("img");
    expect(img.exists()).toBe(true);
    expect(wrapper.find("img").attributes("src")).toContain("test-image.jpg");
  });
});
