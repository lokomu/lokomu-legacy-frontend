export interface Auth {
  isLoggedIn: boolean;
  authResponse: AuthResponse | null;
}

export interface AuthResponse {
  authToken: string;
  user: User;
}

export interface BorrowAgreement {
  borrowID: string;
  item: Item;
  borrower: User;
  owner: User;
  startDate: string;
  endDate: string;
  status: number;
  returnTime: number | null;
  createdAt: number;
}

export interface BorrowRequest {
  borrowRequestID: string;
  item: Item;
  requester: User;
  owner: User;
  message: string | null;
  startDate: string;
  endDate: string;
  status: number;
  createdAt: number;
}

export interface BorrowRequestCreation {
  itemID: string;
  communityID: string;
  message: string;
  startDate: string;
  endDate: string;
}

export interface Community {
  communityID: string;
  name: string;
  description: string;
  visibility: number;
  location: string;
  image: string | null;
}

export interface CommunityCreation {
  name: string;
  description: string;
  visibility: number;
  location: string;
  image: string | null;
}

export interface CommunityRequest {
  communityRequestID: string;
  text: string;
  user: User;
  community: Community;
}

export interface CommunityRequestCreation {
  message: string;
}

export interface Conversation {
  conversationID: string;
  lastMessage: Message;
  recipient: User;
}

export interface ConversationCreation {
  communityID: string,
  byRequest: boolean
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export type IncludedButtons = "accept" | "reject" | "kick" | "chat";

export interface Invite {
  inviteID: string;
  communityID: string;
}

export interface Item {
  itemID: string;
  title: string;
  description: string;
  user: User;
  image: string | null;
}

export interface ItemCreation {
  title: string;
  description: string;
  image: string | null;
  communityIDs: string[];
}

export interface ItemModify {
  title: string;
  description: string;
  image: string | null;
  communityIDs: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface MenuItem {
  id: number;
  text: string;
  class: string;
  action: () => void;
}

export interface Message {
  ID: string;
  content: string;
  timestamp: number;
  from: string;
}

export interface Ratings {
  userAmount: number;
  sameConditionAmount: number;
  betterConditionAmount: number;
  worseConditionAmount: number;
  lateReturnAmount: number;
  notReturnedAmount: number;
}

export interface RatingStatus {
  status: number;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  coordinates: Coordinates;
}

export interface TimeframeDates {
  startDate: string;
  endDate: string;
}

export interface User {
  userID: string;
  firstName: string;
  lastName: string;
  image: string | null;
}

export interface UserModify {
  firstName: string;
  lastName: string;
  image: string | null;
}
