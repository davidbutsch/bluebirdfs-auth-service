import { CredentialsDTO, Session } from "@/modules/session";

import { Types } from "mongoose";

export interface ISessionService {
  findById(id: string): Promise<Session | null>;
  findByAccessToken(at: string): Promise<Session | null>;
  findByRefreshToken(rt: string): Promise<Session | null>;
  create(credentials: CredentialsDTO, rt: string): Promise<Session>;
  isSessionExpired(session: Session): boolean;
  refreshSession(rt: string): Promise<Session>;
}
