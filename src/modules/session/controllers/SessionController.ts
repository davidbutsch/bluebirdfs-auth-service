import { Body, JsonController, Post, Req, Res } from "routing-controllers";

import { CredentialsDTO, ISessionService } from "@/modules/session";
import { inject, injectable } from "tsyringe";
import { AppError } from "@/errors";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { sessionCookieConfig } from "@/common";
import { IUserService } from "@/modules/user";

@injectable()
@JsonController("/sessions")
export class SessionController {
  constructor(
    @inject("SessionService") private sessionService: ISessionService,
    @inject("UserService") private userService: IUserService
  ) {}

  @Post("/")
  async createSession(
    @Req() req: Request,
    @Res() res: Response,
    @Body() credentials: CredentialsDTO
  ) {
    const user = await this.userService.authenticateUser(credentials);

    const refreshToken = req.cookies.rt;
    const session = await this.sessionService.findByRefreshToken(refreshToken);

    if (session)
      throw new AppError(StatusCodes.CONFLICT, "Active session already exists");

    const newSession = await this.sessionService.create(user.id);

    res
      .cookie("at", newSession.accessToken, sessionCookieConfig)
      .cookie("rt", newSession.refreshToken, sessionCookieConfig)
      .status(201)
      .json({ data: { message: "Success" } });
  }

  @Post("/tokens")
  async createTokens(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies.rt;
    const session = await this.sessionService.findByRefreshToken(refreshToken);

    if (!session)
      throw new AppError(StatusCodes.UNAUTHORIZED, "Session not found");

    const refreshedSession = await this.sessionService.refreshSession(session);

    res
      .cookie("at", refreshedSession.accessToken, sessionCookieConfig)
      .cookie("rt", refreshedSession.refreshToken, sessionCookieConfig)
      .json({ data: { message: "Success" } });
  }
}
