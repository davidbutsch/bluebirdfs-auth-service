import { IsBoolean } from "class-validator";

export class UserFlags {
  @IsBoolean() isEmailVerified: boolean;
}
