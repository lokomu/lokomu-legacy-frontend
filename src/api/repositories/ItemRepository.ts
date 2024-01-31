import BaseRepository from "@/api/BaseRepository";
import { Item, ItemCreation, ItemModify } from "@/types/entities";

class ItemRepository extends BaseRepository {
  async postNewItem(itemInfo: ItemCreation): Promise<string> {
    return await this.post("item/borrow", itemInfo);
  }

  //TODO Add given item

  async getMyItem(itemID: string): Promise<Item> {
    return await this.get(`item/${itemID}`);
  }

  async getUserItems(): Promise<Item[]> {
    return await this.get("item/user");
  }

  async putItem(itemID: string, itemInfo: ItemModify): Promise<void> {
    return await this.put(`item/${itemID}`, itemInfo);
  }

  async deleteItem(itemID: string): Promise<void> {
    return await this.delete(`item/${itemID}`);
  }
}

export default ItemRepository;
