import { IsEmail, IsString, IsUrl } from "class-validator";

export class AccountProfile {
  @IsString() firstName: string;
  @IsString() lastName: string;
  @IsEmail() email: string;
  @IsUrl() thumbnail: string;
}
