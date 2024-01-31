import { getRepository } from "@/api/Repositories";
import { AuthResponse, User, UserModify } from "@/types/entities";

const getUserRepository = getRepository("user");

export async function getCurrentUser(): Promise<User> {
  return await getUserRepository().getCurrentUser();
}

export async function editUser(userInfo: UserModify): Promise<void> {
  return await getUserRepository().editUser(userInfo);
}

export async function changePassword(
  password: string,
): Promise<AuthResponse> {
  return await getUserRepository().changePassword(password);
}

export async function deleteAccount(): Promise<void> {
  return await getUserRepository().deleteAccount();
}
