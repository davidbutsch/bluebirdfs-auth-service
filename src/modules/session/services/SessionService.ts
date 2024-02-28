import { inject, injectable } from "tsyringe";
import {
  Session,
  ISessionRepository,
  ISessionService,
} from "@/modules/session";
import { ACCESS_TOKEN_LIFETIME, generateToken } from "@/common";
import { Types } from "mongoose";

@injectable()
export class SessionService implements ISessionService {
  constructor(
    @inject("SessionRepository")
    private sessionRepository: ISessionRepository
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
  async create(userId: string | Types.ObjectId): Promise<Session> {
    const currentDate = new Date();
    const expiresAtDate = new Date(
      currentDate.getTime() + ACCESS_TOKEN_LIFETIME
    );

    const newSession: Session = {
      id: generateToken(),
      userId: userId.toString(),
      accessToken: generateToken(),
      refreshToken: generateToken(),
      expiresAt: expiresAtDate.toISOString(),
      updatedAt: currentDate.toISOString(),
    };

    return this.sessionRepository.create(newSession);
  }
  isSessionExpired(session: Session): boolean {
    const currentDate = new Date();
    const expiresAtDate = new Date(session.expiresAt);

    return currentDate > expiresAtDate;
  }
  async refreshSession(session: Session): Promise<Session> {
    const currentDate = new Date();
    const expiresAtDate = new Date(
      currentDate.getTime() + ACCESS_TOKEN_LIFETIME
    );

    session.accessToken = generateToken();
    session.refreshToken = generateToken();

    session.expiresAt = expiresAtDate.toISOString();

    const updatedSession = await this.sessionRepository.update(session);

    return updatedSession;
  }
}
