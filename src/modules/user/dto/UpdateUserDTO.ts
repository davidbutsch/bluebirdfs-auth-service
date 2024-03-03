import { UserDTO, UserPreferences, UserProfile } from "..";

import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

export class UpdateUserDTO
  implements Omit<UserDTO, "id" | "flags" | "metadata">
{
  @ValidateNested()
  @Type(() => UserProfile)
  profile: UserProfile;

  @ValidateNested()
  @Type(() => UserPreferences)
  preferences: UserPreferences;
}
