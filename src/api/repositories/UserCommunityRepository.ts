import BaseRepository from "@/api/BaseRepository";
import { Community } from "@/types/entities";

class UserCommunityRepository extends BaseRepository {
  async joinOpenCommunity(communityID: string): Promise<void> {
    return await this.post(`community/user/${communityID}`);
  }

  async getUserCommunities(): Promise<Community[]> {
    return await this.get("community/user/communities");
  }

  async getAdminList(): Promise<string[]> {
    return await this.get("community/user/admin/communities");
  }

  async getIfUserAlreadyInCommunity(communityID: string): Promise<boolean> {
    return await this.get(`community/user/${communityID}/status`);
  }

  async getUserAdminOfCommunity(communityID: string): Promise<string> {
    return await this.get(`community/user/${communityID}/admin`);
  }

  async kickUserFromCommunity(
    communityID: string,
    userID: string,
  ): Promise<void> {
    return await this.patch(`community/user/${communityID}/kick/${userID}`);
  }

  async leaveCommunity(communityID: string): Promise<void> {
    return await this.patch(`community/user/${communityID}/leave`);
  }
}

export default UserCommunityRepository;
