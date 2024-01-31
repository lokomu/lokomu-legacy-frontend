import { getRepository } from "@/api/Repositories";
import { Community, CommunityCreation, User } from "@/types/entities";

const getCommunityRepository = getRepository("community");

export async function postNewCommunity(
  communityInfo: Community,
): Promise<string> {
  return await getCommunityRepository().postNewCommunity(communityInfo);
}

export async function getCommunity(communityID: string): Promise<Community> {
  return await getCommunityRepository().getCommunity(communityID);
}

export async function getCommunitiesNearUser(): Promise<Community[]> {
  return await getCommunityRepository().getCommunitiesNearUser();
}

export async function getCommunityMembers(
  communityID: string,
): Promise<User[]> {
  return await getCommunityRepository().getCommunityMembers(communityID);
}

export async function putCommunity(
  communityInfo: CommunityCreation,
  communityID: string,
): Promise<void> {
  return await getCommunityRepository().putCommunity(
    communityInfo,
    communityID,
  );
}

export async function deleteCommunity(communityID: string): Promise<void> {
  return await getCommunityRepository().deleteCommunity(communityID);
}
