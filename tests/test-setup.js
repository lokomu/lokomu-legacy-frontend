import { config, RouterLinkStub } from "@vue/test-utils";
import i18n from "@/i18n";
import { vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";

config.global.plugins.push(i18n);
config.global.plugins.push(createTestingPinia({ createSpy: vi.fn }));
config.global.stubs["router-link"] = RouterLinkStub;
config.global.mocks["$t"] = (msg) => msg;
config.global.mocks["v$"] = { v$: {} };
config.global.mocks["$notify"] = (msg) => msg;
