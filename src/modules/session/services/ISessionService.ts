import { Session } from "@/modules/session";
import { Types } from "mongoose";

export interface ISessionService {
  findById(id: string): Promise<Session | null>;
  findByAccessToken(at: string): Promise<Session | null>;
  findByRefreshToken(rt: string): Promise<Session | null>;
  create(userId: Types.ObjectId | string): Promise<Session>;
  isSessionExpired(session: Session): boolean;
  refreshSession(session: Session): Promise<Session>;
}
