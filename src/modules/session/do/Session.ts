import { IsDateString, IsString } from "class-validator";

import { IsObjectId } from "@/common";

export class Session {
  @IsObjectId() id: string;
  @IsObjectId() userId: string;
  @IsString() accessToken: string;
  @IsString() refreshToken: string;
  @IsDateString() expiresAt: string;
  @IsDateString() updatedAt: string;
}
