import { Session } from "@/modules/session";

export interface ISessionRepository {
  findById(id: string): Promise<Session | null>;
  findByAccessToken(at: string): Promise<Session | null>;
  findByRefreshToken(rt: string): Promise<Session | null>;
}
