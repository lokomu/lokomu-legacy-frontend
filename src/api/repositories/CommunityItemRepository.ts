import BaseRepository from "@/api/BaseRepository";
import { Item } from "@/types/entities";

class CommunityItemRepository extends BaseRepository {
    async getItemsInCommunity(communityID: string): Promise<Item[]> {
        return await this.get(`community/item/${communityID}`);
      }
    
      async getOtherUserItems(): Promise<Item[]> {
        return await this.get("community/item/others");
      }
}

export default CommunityItemRepository;
