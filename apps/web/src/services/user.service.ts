import { ApiClient } from "./api.service";

class UserService extends ApiClient {
  async getMe() {
    return this.get<{ user: any }>("/users/me");
  }
}

export const userService = new UserService({});
