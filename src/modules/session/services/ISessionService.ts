import { CredentialsDTO, Session } from "@/modules/session";

export interface ISessionService {
  findById(id: string): Promise<Session>;
  create(credentials: CredentialsDTO, rt: string): Promise<Session>;
  isSessionExpired(session: Session): boolean;
  refreshSession(rt: string): Promise<Session>;
}
