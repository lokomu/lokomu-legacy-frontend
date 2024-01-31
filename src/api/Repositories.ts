import CommunityRepository from "@/api/repositories/CommunityRepository";
import UserCommunityRepository from "@/api/repositories/UserCommunityRepository";
import UserRepository from "@/api/repositories/UserRepository";
import ChatRepository from "@/api/repositories/ChatRepository";
import CommunityRequestRepository from "@/api/repositories/CommunityRequestRepository";
import ItemRepository from "@/api/repositories/ItemRepository";
import BorrowAgreementRepository from "@/api/repositories/BorrowAgreementRepository";
import ImageRepository from "@/api/repositories/ImageRepository";
import InviteRepository from "@/api/repositories/InviteRepository";
import BorrowRequestRepository from "@/api/repositories/BorrowRequestRepository";
import RatingRepository from "@/api/repositories/RatingRepository";
import CommunityItemRepository from "./repositories/CommunityItemRepository";

import {
  BorrowAgreementRepositoryInterface,
  BorrowRequestRepositoryInterface,
  ChatRepositoryInterface,
  CommunityRepositoryInterface,
  CommunityItemRepositoryInterface,
  CommunityRequestRepositoryInterface,
  ImageRepositoryInterface,
  InviteRepositoryInterface,
  ItemRepositoryInterface,
  UserCommunityRepositoryInterface,
  UserRepositoryInterface,
  RatingRepositoryInterface,
} from "@/types/repositories";

type RepositoryName =
  | "borrowAgreement"
  | "borrowRequest"
  | "chat"
  | "community"
  | "communityItem"
  | "communityRequest"
  | "image"
  | "invite"
  | "item"
  | "rating"
  | "user"
  | "userCommunity";

type RepositoryInstance =
  | BorrowAgreementRepositoryInterface
  | BorrowRequestRepositoryInterface
  | ChatRepositoryInterface
  | CommunityRepositoryInterface
  | CommunityItemRepositoryInterface
  | CommunityRequestRepositoryInterface
  | ImageRepositoryInterface
  | InviteRepositoryInterface
  | ItemRepositoryInterface
  | RatingRepositoryInterface
  | UserRepositoryInterface
  | UserCommunityRepositoryInterface;

type ExtractRepositoryType<T> = T extends "borrowAgreement"
  ? BorrowAgreementRepositoryInterface
  : T extends "borrowRequest"
  ? BorrowRequestRepositoryInterface
  : T extends "chat"
  ? ChatRepositoryInterface
  : T extends "community"
  ? CommunityRepositoryInterface
  : T extends "communityItem"
  ? CommunityItemRepositoryInterface
  : T extends "communityRequest"
  ? CommunityRequestRepositoryInterface
  : T extends "image"
  ? ImageRepositoryInterface
  : T extends "invite"
  ? InviteRepositoryInterface
  : T extends "item"
  ? ItemRepositoryInterface
  : T extends "rating"
  ? RatingRepositoryInterface
  : T extends "user"
  ? UserRepositoryInterface
  : T extends "userCommunity"
  ? UserCommunityRepositoryInterface
  : never;

const repositoryInstances = new Map<RepositoryName, RepositoryInstance>();

export function clearRepositoryInstances(): void {
  repositoryInstances.clear();
}

export function getRepository<T extends RepositoryName>(
  name: T,
): () => ExtractRepositoryType<T> {
  return () => {
    if (!repositoryInstances.has(name)) {
      createRepository(name);
    }
    return repositoryInstances.get(name) as ExtractRepositoryType<T>;
  };
}

function createRepository(name: RepositoryName): RepositoryInstance {
  if (!repositoryInstances.has(name)) {
    let newInstance: RepositoryInstance;
    switch (name) {
      case "borrowAgreement":
        newInstance = new BorrowAgreementRepository();
        break;
      case "borrowRequest":
        newInstance = new BorrowRequestRepository();
        break;
      case "chat":
        newInstance = new ChatRepository();
        break;
      case "community":
        newInstance = new CommunityRepository();
        break;
      case "communityItem":
        newInstance = new CommunityItemRepository();
        break;
      case "communityRequest":
        newInstance = new CommunityRequestRepository();
        break;
      case "image":
        newInstance = new ImageRepository();
        break;
      case "invite":
        newInstance = new InviteRepository();
        break;
      case "item":
        newInstance = new ItemRepository();
        break;
      case "rating":
        newInstance = new RatingRepository();
        break;
      case "user":
        newInstance = new UserRepository();
        break;
      case "userCommunity":
        newInstance = new UserCommunityRepository();
        break;
      default:
        throw new Error(`Unknown repository: ${name}`);
    }
    repositoryInstances.set(name, newInstance);
  }
  return repositoryInstances.get(name)!;
}
