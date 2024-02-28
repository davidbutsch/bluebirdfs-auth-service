import { IsDateString } from "class-validator";

export class UserMetadata {
  @IsDateString() createdAt: string;
}
