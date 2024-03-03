import { CreateUserDTO, UserDTO } from "@/modules/user";

import { CredentialsDTO } from "@/modules/session";

export interface IUserService {
  findById(id: string): Promise<UserDTO>;
  authenticateUser(credentials: CredentialsDTO): Promise<UserDTO>;
  create(user: CreateUserDTO): Promise<UserDTO>;
  updateName(id: string, update: string): Promise<UserDTO | null>;
  delete(id: string): Promise<void>;
}
