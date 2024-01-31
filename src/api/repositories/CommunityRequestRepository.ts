import BaseRepository from "@/api/BaseRepository";
import {
  CommunityRequest,
  CommunityRequestCreation,
  User,
} from "@/types/entities";

class CommunityRequestRepository extends BaseRepository {
  async sendCommunityJoinRequest(
    communityID: string,
    communityRequest: CommunityRequestCreation,
  ): Promise<void> {
    return await this.post(
      `community/request/${communityID}`,
      communityRequest,
    );
  }

  async acceptUserIntoCommunity(
    communityID: string,
    userID: string,
  ): Promise<void> {
    return await this.post(`community/request/${communityID}/${userID}/accept`);
  }

  async rejectUserFromCommunity(
    communityID: string,
    userID: string,
  ): Promise<void> {
    return await this.delete(`community/request/${communityID}/${userID}`);
  }

  async removeOwnRequestFromCommunity(communityID: string): Promise<void> {
    return await this.delete(`community/request/${communityID}/self`);
  }

  async getMemberRequestsOfCommunity(communityID: string): Promise<User[]> {
    return await this.get(`community/request/${communityID}`);
  }

  async getSpecificCommunityRequestForMember(
    communityID: string,
    userID: string,
  ): Promise<CommunityRequest> {
    return await this.get(`community/request/${communityID}/${userID}`);
  }
}

export default CommunityRequestRepository;
