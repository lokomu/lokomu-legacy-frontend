import { getRepository } from "@/api/Repositories";

const getImageRepository = getRepository("image");

export async function uploadNewImage(
  imageByteArray: Uint8Array,
): Promise<string> {
  return await getImageRepository().uploadNewImage(imageByteArray);
}
