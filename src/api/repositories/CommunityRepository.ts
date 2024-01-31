import BaseRepository from "@/api/BaseRepository";
import { Community, CommunityCreation, User } from "@/types/entities";

class CommunityRepository extends BaseRepository {
  async postNewCommunity(communityInfo: Community): Promise<string> {
    return await this.post("community/", communityInfo);
  }

  async getCommunity(communityID: string): Promise<Community> {
    return await this.get(`community/${communityID}`);
  }

  async getCommunitiesNearUser(): Promise<Community[]> {
    return await this.get("community/near");
  }

  async getCommunityMembers(communityID: string): Promise<User[]> {
    return await this.get(`community/${communityID}/members`);
  }

  async putCommunity(
    communityInfo: CommunityCreation,
    communityID: string,
  ): Promise<void> {
    return await this.put(`community/${communityID}`, communityInfo);
  }

  async deleteCommunity(communityID: string): Promise<void> {
    return await this.delete(`community/${communityID}`);
  }
}

export default CommunityRepository;
