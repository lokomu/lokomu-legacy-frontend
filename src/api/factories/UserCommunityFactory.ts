import { getRepository } from "@/api/Repositories";
import { Community } from "@/types/entities";

const getUserCommunityRepository = getRepository("userCommunity");

export async function joinOpenCommunity(communityID: string): Promise<void> {
  return await getUserCommunityRepository().joinOpenCommunity(communityID);
}

export async function getUserCommunities(): Promise<Community[]> {
  return await getUserCommunityRepository().getUserCommunities();
}

export async function getAdminList(): Promise<string[]> {
  return await getUserCommunityRepository().getAdminList();
}

export async function getIfUserAlreadyInCommunity(
  communityID: string,
): Promise<boolean> {
  return await getUserCommunityRepository().getIfUserAlreadyInCommunity(
    communityID,
  );
}

export async function getUserAdminOfCommunity(
  communityID: string,
): Promise<string> {
  return await getUserCommunityRepository().getUserAdminOfCommunity(
    communityID,
  );
}

export async function kickUserFromCommunity(
  communityID: string,
  userID: string,
): Promise<void> {
  return await getUserCommunityRepository().kickUserFromCommunity(
    communityID,
    userID,
  );
}

export async function leaveCommunity(communityID: string): Promise<void> {
  return await getUserCommunityRepository().leaveCommunity(communityID);
}
