import { IsEmail, IsOptional, IsString, IsUrl } from "class-validator";

export class UserProfile {
  @IsString() firstName: string;
  @IsOptional() @IsString() lastName?: string;
  @IsEmail() email: string;
  @IsUrl() thumbnail: string;
}
