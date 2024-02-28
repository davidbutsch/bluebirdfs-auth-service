import { User, UserDTO } from "@/modules/user";

import { CredentialsDTO } from "@/modules/session";

export interface IUserService {
  findById(id: string): Promise<UserDTO | null>;
  authenticateUser(credentials: CredentialsDTO): Promise<UserDTO>;
  create(user: Partial<User>): Promise<UserDTO>;
  updateName(id: string, update: string): Promise<UserDTO | null>;
  delete(id: string): Promise<void>;
}
