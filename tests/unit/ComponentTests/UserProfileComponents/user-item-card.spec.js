import { mount } from "@vue/test-utils";
import UserItemCard from "@/components/UserProfileComponents/UserItemCard.vue";
import {describe, it, expect} from "vitest";
import ColorButton from "@/components/BaseComponents/ColorButton";
import CommentIcon from "@/components/IconComponents/CommentIcon";
import PersonIcon from "@/components/IconComponents/PersonIcon";

describe("UserItemCard", () => {
    const wrapper = mount(UserItemCard, {
        props: {
            user: {
                userId: "123",
                firstName: "John",
                lastName: "Doe",
                image: "",
            },
            buttons: ["chat", "kick", "accept", "reject"],
            requests: true,
            admin: true,
        },
        global: {
            components: {
                ColorButton,
                CommentIcon,
                PersonIcon,
            },
        },
    });

    it("renders the user's full name correctly", () => {
        expect(wrapper.find(".font-medium").text()).toBe("John Doe");
    });

    it("renders the chat button", () => {
        const chatButton = wrapper.findComponent({ name: "ColorButton" });
        expect(chatButton.exists()).toBe(true);
        expect(chatButton.props("buttonColor")).toBe("blue");
        expect(chatButton.props("text")).toBe("button.community.chat");
    });

    it("renders the kick button", () => {
        const kickButton = wrapper.findAllComponents({ name: "ColorButton" })[1];
        expect(kickButton.exists()).toBe(true);
        expect(kickButton.props("buttonColor")).toBe("red");
        expect(kickButton.props("text")).toBe("button.community.kick");
    });

    it("renders the accept button", () => {
        const acceptButton = wrapper.findAllComponents({ name: "ColorButton" })[2];
        expect(acceptButton.exists()).toBe(true);
        expect(acceptButton.props("buttonColor")).toBe("green");
        expect(acceptButton.props("text")).toBe("button.request.accept");
    });

    it("renders the reject button", () => {
        const rejectButton = wrapper.findAllComponents({ name: "ColorButton" })[3];
        expect(rejectButton.exists()).toBe(true);
        expect(rejectButton.props("buttonColor")).toBe("red");
        expect(rejectButton.props("text")).toBe("button.request.decline");
    });

    it("renders the comment icon", () => {
        const commentIcon = wrapper.findComponent({ name: "CommentIcon" });
        expect(commentIcon.exists()).toBe(true);
    });
});