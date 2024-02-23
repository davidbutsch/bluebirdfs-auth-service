import { Session } from "..";
import { inject, injectable } from "tsyringe";
import { ISessionRepository, ISessionService } from "@/modules/session";

@injectable()
export class SessionService implements ISessionService {
  constructor(
    @inject("SessionRepository") private sessionRepository: ISessionRepository
  ) {}

  findById(id: string): Promise<Session | null> {
    return this.sessionRepository.findById(id);
  }
  findByAccessToken(at: string): Promise<Session | null> {
    return this.sessionRepository.findByAccessToken(at);
  }
  findByRefreshToken(rt: string): Promise<Session | null> {
    return this.sessionRepository.findByRefreshToken(rt);
  }
  isSessionExpired(session: Session): boolean {
    const currentDate = new Date();
    const expiresAtDate = new Date(session.expiresAt);

    return currentDate > expiresAtDate;
  }
}
