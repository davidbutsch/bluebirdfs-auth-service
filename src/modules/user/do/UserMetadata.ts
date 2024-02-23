import { IsDate } from "class-validator";

export class UserMetadata {
  @IsDate() createdAt: Date;
}
