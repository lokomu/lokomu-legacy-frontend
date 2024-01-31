import BaseRepository from "@/api/BaseRepository";
import { Ratings } from "@/types/entities";

class RatingRepository extends BaseRepository {
  async getRatingsForUser(userID: string): Promise<Ratings> {
    return await this.get(`rating/ratings/user/${userID}`);
  }
}

export default RatingRepository;
