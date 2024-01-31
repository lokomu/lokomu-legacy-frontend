import BaseRepository from "@/api/BaseRepository";
import { Conversation, ConversationCreation, Message } from "@/types/entities";

class ChatRepository extends BaseRepository {
  async sendMessage(conversationID: string, message: string): Promise<string> {
    return await this.post(`chat/${conversationID}/message`, { message });
  }

  async getConversations(): Promise<Conversation[]> {
    return await this.get("chat/user/conversations");
  }

  async getMessages(conversationID: string, page: number): Promise<Message[]> {
    return await this.get(`chat/${conversationID}/${page}`);
  }

  async createConversation(
    userID: string,
    conversationCreation: ConversationCreation
  ): Promise<string> {
    return await this.post(`chat/conversation/${userID}`, conversationCreation);
  }

  async getConversationID(
    userID: string
  ): Promise<string> {
    return await this.get(`chat/conversation/${userID}`);
  }

  async doesConversationExist(
    userID: string
  ): Promise<boolean> {
    return await this.get(
      `chat/conversation/exists/${userID}`,
    );
  }
}

export default ChatRepository;
