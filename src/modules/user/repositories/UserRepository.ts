import { Document, QueryOptions, Types, UpdateQuery } from "mongoose";
import { IUserRepository, User, UserModel } from "@/modules/user";

export class UserRepository implements IUserRepository {
  findById(
    id: string | Types.ObjectId | undefined,
    options?: QueryOptions
  ): Promise<(User & Document) | null> {
    return UserModel.findById(id, null, options);
  }
  async findByEmail(
    email: string,
    options?: QueryOptions
  ): Promise<(User & Document) | null> {
    return UserModel.findOne({ "profile.email": email }, null, options);
  }
  create(user: Partial<User>): Promise<User & Document> {
    return UserModel.create(user);
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
