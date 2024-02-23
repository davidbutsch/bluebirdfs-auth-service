import { IsISO6391 } from "@/common";

export class UserPreferences {
  @IsISO6391() language: string;
}
