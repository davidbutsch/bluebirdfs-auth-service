import { User, UserDTO } from "@/modules/user";

export interface IUserService {
  findById(id: string): Promise<UserDTO | null>;
  create(user: Partial<User>): Promise<UserDTO>;
  updateName(id: string, update: string): Promise<UserDTO | null>;
  delete(id: string): Promise<void>;
}
