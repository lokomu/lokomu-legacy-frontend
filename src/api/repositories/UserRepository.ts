import BaseRepository from "@/api/BaseRepository";
import { AuthResponse, User, UserModify } from "@/types/entities";

class UserRepository extends BaseRepository {
  async getCurrentUser(): Promise<User> {
    return await this.get("user/");
  }

  async editUser(userInfo: UserModify): Promise<void> {
    return await this.put("user/", userInfo);
  }

  //TODO FIX PASSWORD TO OBJECT
  async changePassword(
    password: string,
  ): Promise<AuthResponse> {
    return await this.patch("user/password", { password });
  }

  async deleteAccount(): Promise<void> {
    return await this.delete("user/");
  }
}

export default UserRepository;
