import { IsString } from "class-validator";

export class UserSecurity {
  @IsString() password: string;
}
