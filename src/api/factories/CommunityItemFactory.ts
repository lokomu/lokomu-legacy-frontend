import { getRepository } from "@/api/Repositories";
import { Item } from "@/types/entities";

const getCommunityItemRepository = getRepository("communityItem");

export async function getItemsInCommunity(
    communityID: string,
  ): Promise<Item[]> {
    return await getCommunityItemRepository().getItemsInCommunity(communityID);
  }

export async function getOtherUserItems(): Promise<Item[]> {
    return await getCommunityItemRepository().getOtherUserItems();
  }