import { Document, QueryOptions, Types, UpdateQuery } from "mongoose";

import { IUserRepository } from "./IUserRepository";
import { User } from "@/modules/user";

export class UserRepository implements IUserRepository {
  findById(
    id: string | Types.ObjectId | undefined,
    options?: QueryOptions
  ): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  create(User: Partial<User>): Promise<User> {
    throw new Error("Method not implemented.");
  }
  update(
    id: string | Types.ObjectId | undefined,
    update: UpdateQuery<User & Document>
  ): Promise<(User & Document) | null> {
    throw new Error("Method not implemented.");
  }
  delete(id: string | Types.ObjectId | undefined): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
