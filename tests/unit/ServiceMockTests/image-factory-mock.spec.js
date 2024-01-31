import {
  uploadNewImage,
} from "@/api/factories/ImageFactory";
import { describe, expect, it, vi } from "vitest";
import AxiosInstance from "@/api/AxiosInstance";

vi.mock("@/api/AxiosInstance");

describe("testing mocking of Image Service image api calls", () => {

  it("check that image gets posted", async () => {
    let expectedResponse = 1;

    AxiosInstance.post.mockImplementation(() =>
      Promise.resolve({ data: expectedResponse })
    );

    const imageResponse = await uploadNewImage("image");
    expect(imageResponse).toBe(expectedResponse);
  });
});
