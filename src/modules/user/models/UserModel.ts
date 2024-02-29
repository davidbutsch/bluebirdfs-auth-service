import { Model, Schema, model } from "mongoose";

import { User } from "..";
import { validateISO6381 } from "@/common";

type UserModelType = Model<User>;

const profileSchema = new Schema<User["profile"]>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    thumbnail: { type: String, required: true },
  },
  { _id: false }
);

const preferencesSchema = new Schema<User["preferences"]>(
  {
    language: {
      type: String,
      required: true,
      validate: {
        validator: validateISO6381,
      },
    },
  },
  { _id: false }
);

const securitySchema = new Schema<User["security"]>(
  {
    password: { type: String, default: null },
  },
  { _id: false }
);

const flagsSchema = new Schema<User["flags"]>(
  {
    isEmailVerified: { type: Boolean, required: true, default: false },
  },
  { _id: false }
);

const metadataSchema = new Schema<User["metadata"]>(
  {
    createdAt: {
      type: String,
      required: true,
      default: () => new Date().toISOString(),
    },
  },
  { _id: false }
);

export const userSchema = new Schema<User, UserModelType>({
  profile: { type: profileSchema, required: true },
  preferences: { type: preferencesSchema, required: true },
  security: { type: securitySchema, required: true },
  flags: { type: flagsSchema, required: true },
  metadata: { type: metadataSchema, required: true },
});

export const UserModel = model<User, UserModelType>("User", userSchema);
