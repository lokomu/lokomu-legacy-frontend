import BaseRepository from "@/api/BaseRepository";

class ImageRepository extends BaseRepository {
  async uploadNewImage(imageByteArray: Uint8Array): Promise<string> {
    return await this.post("image/", imageByteArray, {
      headers: { "Content-Type": "image/jpeg" },
    });
  }
}

export default ImageRepository;
