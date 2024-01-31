import { getRepository } from "@/api/Repositories";
import { Item, ItemCreation, ItemModify } from "@/types/entities";

const getItemRepository = getRepository("item");

export async function postNewItem(itemInfo: ItemCreation): Promise<string> {
  return await getItemRepository().postNewItem(itemInfo);
}

export async function getMyItem(itemID: string): Promise<Item> {
  return await getItemRepository().getMyItem(itemID);
}

export async function getUserItems(): Promise<Item[]> {
  return await getItemRepository().getUserItems();
}

export async function putItem(
  itemID: string,
  itemInfo: ItemModify,
): Promise<void> {
  return await getItemRepository().putItem(itemID, itemInfo);
}

export async function deleteItem(itemID: string): Promise<void> {
  return await getItemRepository().deleteItem(itemID);
}
