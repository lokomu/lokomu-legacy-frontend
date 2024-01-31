import { getRepository } from "@/api/Repositories";
import {
  CommunityRequest,
  CommunityRequestCreation,
  User,
} from "@/types/entities";

const getCommunityRequestRepository = getRepository("communityRequest");

export async function sendCommunityJoinRequest(
  communityID: string,
  communityRequest: CommunityRequestCreation,
): Promise<void> {
  return await getCommunityRequestRepository().sendCommunityJoinRequest(
    communityID,
    communityRequest,
  );
}

export async function acceptUserIntoCommunity(
  communityID: string,
  userID: string,
): Promise<void> {
  return await getCommunityRequestRepository().acceptUserIntoCommunity(
    communityID,
    userID,
  );
}

export async function rejectUserFromCommunity(
  communityID: string,
  userID: string,
): Promise<void> {
  return await getCommunityRequestRepository().rejectUserFromCommunity(
    communityID,
    userID,
  );
}

export async function removeOwnRequestFromCommunity(
  communityID: string,
  userID: string,
): Promise<void> {
  return await getCommunityRequestRepository().removeOwnRequestFromCommunity(
    communityID,
    userID,
  );
}

export async function getMemberRequestsOfCommunity(
  communityID: string,
): Promise<User[]> {
  return await getCommunityRequestRepository().getMemberRequestsOfCommunity(
    communityID,
  );
}

export async function getSpecificCommunityRequestForMember(
  communityID: string,
  userID: string,
): Promise<CommunityRequest> {
  return await getCommunityRequestRepository().getSpecificCommunityRequestForMember(
    communityID,
    userID,
  );
}
