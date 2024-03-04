import { IsEmail, IsOptional, IsString } from "class-validator";

export class CreateUserDTO {
  @IsEmail() email: string;
  @IsString() firstName: string;
  @IsString() lastName: string;
  @IsOptional() @IsString() password?: string;
}
