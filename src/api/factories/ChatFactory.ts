import { getRepository } from "@/api/Repositories";
import { Conversation, ConversationCreation, Message } from "@/types/entities";

const getChatRepository = getRepository("chat");

export async function getConversations(): Promise<Conversation[]> {
  return await getChatRepository().getConversations();
}

export async function getMessages(
  conversationID: string,
  page: number,
): Promise<Message[]> {
  return await getChatRepository().getMessages(conversationID, page);
}

export async function sendMessage(
  conversationID: string,
  message: string,
): Promise<string> {
  return await getChatRepository().sendMessage(conversationID, message);
}

export async function createConversation(
  userID: string,
  conversationCreation: ConversationCreation
): Promise<string> {
  return await getChatRepository().createConversation(
    userID,
    conversationCreation
  );
}

export async function getConversationID(
  userID: string
): Promise<string> {
  return await getChatRepository().getConversationID(userID);
}

export async function doesConversationExist(
  userID: string
): Promise<boolean> {
  return await getChatRepository().doesConversationExist(
    userID
  );
}
