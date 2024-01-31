import { getRepository } from "@/api/Repositories";
import { Invite } from "@/types/entities";

const getInviteRepository = getRepository("invite");

export async function createInvite(communityID: string): Promise<Invite> {
  return await getInviteRepository().createInvite(communityID);
}

export async function acceptInvite(inviteID: string): Promise<string> {
  return await getInviteRepository().acceptInvite(inviteID);
}
