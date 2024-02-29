import { Document, QueryOptions, Types, UpdateQuery } from "mongoose";

import { User } from "@/modules/user";

export interface IUserRepository {
  findById(
    id: Types.ObjectId | string | undefined,
    options?: QueryOptions
  ): Promise<(User & Document) | null>;
  findByEmail(
    email: string,
    options?: QueryOptions
  ): Promise<(User & Document) | null>;
  create(user: Partial<User>): Promise<User & Document>;
  update(
    id: Types.ObjectId | string | undefined,
    update: UpdateQuery<User & Document>
  ): Promise<(User & Document) | null>;
  delete(id: Types.ObjectId | string | undefined): Promise<void>;
}
