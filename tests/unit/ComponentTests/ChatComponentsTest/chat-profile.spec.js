import { shallowMount } from "@vue/test-utils";
import ChatProfile from "@/components/ChatComponents/ChatProfile.vue";
import { describe, expect, it, beforeEach } from "vitest";

describe("ChatProfile.vue", () => {
  let wrapper;
  const props = {
    conversation: {
      recipient: {
        userId: 1,
        firstName: "Test",
        lastName: "Testersen",
        image: "www.google.com",
      },
      lastMessage: {
        ID: 0,
        content: "Hello",
        timestamp: new Date(),
        from: 0,
        to: 0,
      },
    },
  };
  beforeEach(() => {
    wrapper = shallowMount(ChatProfile, {
      propsData: props,
    });
  });

  it("Is instantiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Test that last message renders", () => {
    expect(wrapper.findAll("span").length).toBe(3);
    expect(wrapper.findAll("span")[0].text()).toBe("Test Testersen");
    expect(wrapper.findAll("span")[1].text()).toBe("0 minutes ago");
    expect(wrapper.findAll("span")[2].text()).toBe("Hello");
  });

  it("Test that timestamp changes message", async () => {
    expect(wrapper.findAll("span")[1].text()).toBe("0 minutes ago");

    const updatedProps = props;
    let times = [
      { value: 30 * 60 * 1000, expected: "30 minutes ago" },
      { value: 60 * 60 * 1000, expected: "1 hours ago" },
      { value: 24 * 60 * 60 * 1000, expected: "1 days ago" },
    ];
    for (let i = 0; i < times.length; i++) {
      updatedProps.conversation.lastMessage.timestamp =
        Date.now() - times[i].value;
      const newWrapper = shallowMount(ChatProfile, {
        propsData: updatedProps,
      });
      expect(newWrapper.exists()).toBeTruthy();
      expect(newWrapper.findAll("span")[1].text()).toBe(times[i].expected);
    }
  });
});
