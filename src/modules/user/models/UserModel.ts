import { Model, Schema, model } from "mongoose";

import { User } from "..";
import { mongoRequired } from "@/common";
import { validateISO6381 } from "@/common";

type UserModelType = Model<User>;

const profileSchema = new Schema<User["profile"]>(
  {
    firstName: mongoRequired(String),
    lastName: mongoRequired(String),
    email: mongoRequired(String),
    thumbnail: mongoRequired(String),
  },
  { _id: false }
);

const preferencesSchema = new Schema<User["preferences"]>(
  {
    language: {
      type: String,
      required: true,
      default: "en",
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
    createdAt: mongoRequired(Date),
  },
  { _id: false }
);

export const userSchema = new Schema<User, UserModelType>({
  profile: profileSchema,
  preferences: preferencesSchema,
  security: securitySchema,
  flags: flagsSchema,
  metadata: metadataSchema,
});

export const UserModel = model<User, UserModelType>("User", userSchema);
