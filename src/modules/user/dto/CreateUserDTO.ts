import { IsEmail, IsString } from "class-validator";

export class CreateUserDTO {
  @IsEmail() email: string;
  @IsString() firstName: string;
  @IsString() lastName: string;
  @IsString() password: string;
}
