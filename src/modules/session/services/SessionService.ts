import { inject, injectable } from "tsyringe";
import {
  Session,
  ISessionRepository,
  ISessionService,
  CredentialsDTO,
} from "@/modules/session";
import { ACCESS_TOKEN_LIFETIME, generateToken } from "@/common";
import { IUserService } from "@/modules/user";
import { AppError } from "@/errors";
import { StatusCodes } from "http-status-codes";

@injectable()
export class SessionService implements ISessionService {
  constructor(
    @inject("SessionRepository")
    private sessionRepository: ISessionRepository,
    @inject("UserService") private userService: IUserService
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
  async create(credentials: CredentialsDTO, rt: string): Promise<Session> {
    const user = await this.userService.authenticateUser(credentials);

    const session = await this.findByRefreshToken(rt);

    if (session)
      throw new AppError(StatusCodes.CONFLICT, "Active session already exists");

    const currentDate = new Date();
    const expiresAtDate = new Date(
      currentDate.getTime() + ACCESS_TOKEN_LIFETIME
    );

    const newSession: Session = {
      id: generateToken(),
      userId: user.id,
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
  async refreshSession(rt: string): Promise<Session> {
    const session = await this.findByRefreshToken(rt);

    if (!session)
      throw new AppError(StatusCodes.UNAUTHORIZED, "Session not found");

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
