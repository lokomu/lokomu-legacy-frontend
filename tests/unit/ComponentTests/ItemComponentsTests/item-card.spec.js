import { mount } from "@vue/test-utils";
import ItemCard from "@/components/ItemComponents/ItemCard.vue";
import { describe, it, expect } from "vitest";

describe("ItemCard", () => {
  const wrapper = mount(ItemCard);
  it("should render the title prop", () => {
    const title = "Example Item";
    const wrapper = mount(ItemCard, {
      props: {
        title,
      },
    });

    expect(wrapper.text()).toContain(title);
  });

  it("should render the image prop", () => {
    const image = "example-image.jpg";
    const wrapper = mount(ItemCard, {
      props: {
        image,
      },
    });

    expect(wrapper.find("img").attributes("src")).toContain(image);
  });

  it("should not render the image if no img prop is passed", () => {
    expect(wrapper.find("img").exists()).toBe(false);
  });

  it("is instantiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});