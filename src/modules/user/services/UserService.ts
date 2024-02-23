import { User, UserDTO } from "@/modules/user";

import { IUserService } from "./IUserService";
import { Types } from "mongoose";
import { injectable } from "tsyringe";

@injectable()
export class UserService implements IUserService {
  async findById(id: string): Promise<UserDTO | null> {
    return null;
  }
  create(user: Partial<User>): Promise<UserDTO> {
    throw new Error("Method not implemented.");
  }
  updateName(id: string, update: string): Promise<UserDTO | null> {
    throw new Error("Method not implemented.");
  }
  delete(id: string | Types.ObjectId | undefined): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
