import BaseRepository from "@/api/BaseRepository";
import { Invite } from "@/types/entities";

class InviteRepository extends BaseRepository {
  async createInvite(communityID: string): Promise<Invite> {
    return await this.post(`invite/${communityID}`);
  }

  async acceptInvite(inviteID: string): Promise<string> {
    return await this.post(`invite/accept/${inviteID}`);
  }
}

export default InviteRepository;
