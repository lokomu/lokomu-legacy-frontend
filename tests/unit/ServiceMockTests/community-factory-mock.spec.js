import {
  getCommunity,
  getCommunityMembers,
  getItemsInCommunity,
} from "@/api/factories/CommunityFactory";
import AxiosInstance from "@/api/AxiosInstance";
import { describe, expect, it, vi} from "vitest";

vi.mock("@/api/AxiosInstance");

describe("testing mocking of Community Service", () => {

  it("check that existing community returns correctly", async () => {
    const expectedResponse = {
      communityId: 4040,
      name: "Fisken i vannet",
      description: "For vi som liker fjell fisk",
      visibility: 1,
      location: "Bergen brygge",
      image: "fish blub blub",
    };

    AxiosInstance.get.mockImplementation(() =>
      Promise.resolve({ data: expectedResponse })
    );

    const communityResponse = await getCommunity(4040);
    expect(communityResponse.name).toBe(expectedResponse.name);
  });

  it("check that existing community returns correct items", async () => {
    const expectedResponse = {
      item1: {
        title: "Fiskekurs",
        description: "Fisking og sånn",
        address: "Vannet",
        userID: 6,
        communityIDs: null,
      },

      item2: {
        title: "TestFraFrontend",
        description: "oslo",
        address: "oslo",
        userID: 1,
        communityIDs: null,
      },
    };

    AxiosInstance.get.mockImplementation(() =>
      Promise.resolve({ data: expectedResponse })
    );

    const communityItemResponse = await getItemsInCommunity(4040);
    expect(communityItemResponse).toBe(expectedResponse);
  });

  it("check that existing community returns correct members", async () => {
    const expectedResponse = {
      member1: {
        userId: 2,
        email: "erik@erik.com",
        firstName: "erik",
        lastName: "hansen",
        address: "gløshaugen",
        image: "ok",
      },

      member2: {
        userId: 1,
        email: "test@test.com",
        firstName: "test",
        lastName: "testesen",
        address: "oslo",
        image: "ok",
      },
    };

    AxiosInstance.get.mockImplementation(() =>
      Promise.resolve({ data: expectedResponse })
    );

    const communityMembersResponse = await getCommunityMembers(4040);
    expect(communityMembersResponse).toBe(expectedResponse);
  });
});
