import { IsNullable } from "@/common";
import { IsString } from "class-validator";

export class UserSecurity {
  @IsNullable()
  @IsString()
  password: string | null;
}
