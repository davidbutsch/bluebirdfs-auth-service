import { IsDefined, IsNotEmptyObject, ValidateNested } from "class-validator";
import {
  UserFlags,
  UserMetadata,
  UserPreferences,
  UserProfile,
  UserSecurity,
} from ".";

import { IsObjectId } from "@/common";
import { Type } from "class-transformer";

export class User {
  @IsObjectId() _id: string;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UserProfile)
  profile: UserProfile;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UserPreferences)
  preferences: UserPreferences;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UserSecurity)
  security: UserSecurity;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UserFlags)
  flags: UserFlags;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UserMetadata)
  metadata: UserMetadata;
}
