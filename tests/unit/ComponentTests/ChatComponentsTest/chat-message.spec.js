import { shallowMount } from "@vue/test-utils";
import ChatMessage from "@/components/ChatComponents/ChatMessage.vue";
import { describe, expect, it, beforeEach } from "vitest";

describe("ChatMessage.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(ChatMessage, {
      propsData: {
        message: {
          id: 1,
          content: "Hello",
          timestamp: new Date(),
          from: "1",
          to: 0,
        },
      },
    });
  });

  it("Is instantiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
