import { IsDefined, IsNotEmptyObject, ValidateNested } from "class-validator";
import {
  User,
  UserFlags,
  UserMetadata,
  UserModel,
  UserPreferences,
  UserProfile,
} from "@/modules/user";

import { Type } from "class-transformer";

export class UserDTO {
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
  @Type(() => UserFlags)
  flags: UserFlags;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UserMetadata)
  metadata: UserMetadata;

  static toDTO(domain: User): UserDTO {
    if (domain instanceof UserModel) domain = domain.toObject();

    const { security, ...DTO } = domain;

    return DTO;
  }
}
