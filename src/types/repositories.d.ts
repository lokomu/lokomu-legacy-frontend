import BorrowRequestRepository from "@/api/repositories/BorrowRequestRepository";
import {
  BorrowAgreement,
  ItemCreation,
  ItemModify,
  TimeframeDates,
UserModify,
ConversationCreation
} from "@/types/entities";

interface BorrowAgreementRepositoryInterface {
  getBorrowAgreementTimesForItem(itemID: string): Promise<TimeframeDates[]>;
  changeAgreementStatusToOngoing(agreementID: string): Promise<void>;
  changeAgreementStatusToReturned(agreementID: string): Promise<void>;
  changeAgreementStatusToCompleted(
    agreementID: string,
    ratingStatus: RatingStatus,
  ): Promise<void>;
  getIncompleteAgreementsForOwner(): Promise<BorrowAgreement[]>;
  getIncompleteAgreementsForBorrower(): Promise<BorrowAgreement[]>;
  getCompletedAgreementsForOwner(): Promise<BorrowAgreement[]>;
  getCompletedAgreementsForBorrower(): Promise<BorrowAgreement[]>;
}

interface InviteRepositoryInterface {
  createInvite(communityID: string): Promise<Invite>;
  acceptInvite(inviteID: string): Promise<string>;
}

interface ImageRepositoryInterface {
  uploadNewImage(imageByteArray: Uint8Array): Promise<string>;
}

interface BorrowRequestRepositoryInterface {
  createBorrowRequest(requestCreationDTO: BorrowRequestCreation): Promise<void>;
  getPendingRequestsForOwner(): Promise<BorrowRequest[]>;
  getPendingRequestsForRequester(): Promise<BorrowRequest[]>;
  getCanceledRequestsForOwner(): Promise<BorrowRequest[]>;
  getCanceledRequestsForRequester(): Promise<BorrowRequest[]>;
  getDeclinedRequestsForOwner(): Promise<BorrowRequest[]>;
  getDeclinedRequestsForRequester(): Promise<BorrowRequest[]>;
  acceptRequest(requestID: string): Promise<void>;
  declineRequest(requestID: string): Promise<void>;
}

interface ChatRepositoryInterface {
  sendMessage(conversationID: string, message: string): Promise<string>;
  getConversations(): Promise<Conversation[]>;
  getMessages(conversationID: string, page: number): Promise<Message[]>;
  createConversation(
    userID: string,
    conversationCreation: ConversationCreation
  ): Promise<string>;
  getConversationID(userID: string): Promise<string>;
  doesConversationExist(
    userID: string
  ): Promise<boolean>;
}

interface CommunityRepositoryInterface {
  postNewCommunity(communityInfo: Community): Promise<string>;
  getCommunity(communityID: string): Promise<Community>;
  getCommunitiesNearUser(): Promise<Community[]>;
  getCommunityMembers(communityID: string): Promise<User[]>;
  putCommunity(
    communityInfo: CommunityCreation,
    communityID: string,
  ): Promise<void>;
  deleteCommunity(communityID: string): Promise<void>;
}

interface CommunityItemRepositoryInterface {
  getItemsInCommunity(communityID: string): Promise<Item[]>;
  getOtherUserItems(): Promise<Item[]>;
}

interface CommunityRequestRepositoryInterface {
  sendCommunityJoinRequest(
    communityID: string,
    communityRequest: CommunityRequestCreation,
  ): Promise<void>;
  acceptUserIntoCommunity(communityID: string, userID: string): Promise<void>;
  rejectUserFromCommunity(communityID: string, userID: string): Promise<void>;
  removeOwnRequestFromCommunity(communityID: string): Promise<void>;
  getMemberRequestsOfCommunity(communityID: string): Promise<User[]>;
  getSpecificCommunityRequestForMember(
    communityID: string,
    userID: string,
  ): Promise<CommunityRequest>;
}

interface ItemRepositoryInterface {
  postNewItem(itemInfo: ItemCreation): Promise<string>;
  getMyItem(itemID: string): Promise<Item>;
  getUserItems(): Promise<Item[]>;
  putItem(itemID: string, itemInfo: ItemModify): Promise<void>;
  deleteItem(itemID: string): Promise<void>;
}

interface RatingRepositoryInterface {
  getRatingsForUser(userID: string): Promise<Ratings>;
}

interface UserRepositoryInterface {
  getCurrentUser(): Promise<User>;
  editUser(userInfo: UserModify): Promise<void>;
  changePassword(password: string): Promise<AuthResponse>;
  deleteAccount(): Promise<void>;
}

interface UserCommunityRepositoryInterface {
  joinOpenCommunity(communityID: string): Promise<void>;
  getUserCommunities(): Promise<Community[]>;
  getAdminList(): Promise<string[]>;
  getIfUserAlreadyInCommunity(communityID: string): Promise<boolean>;
  getUserAdminOfCommunity(communityID: string): Promise<string>;
  kickUserFromCommunity(communityID: string, userID: string): Promise<void>;
  leaveCommunity(communityID: string): Promise<void>;
}
