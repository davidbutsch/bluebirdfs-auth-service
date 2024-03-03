import {
  Body,
  CookieParam,
  JsonController,
  Post,
  Res,
} from "routing-controllers";

import { CredentialsDTO, ISessionService } from "@/modules/session";
import { inject, injectable } from "tsyringe";
import { Response } from "express";
import { sessionCookieConfig } from "@/common";

@injectable()
@JsonController("/sessions")
export class SessionController {
  constructor(
    @inject("SessionService") private sessionService: ISessionService
  ) {}

  @Post("/")
  async createSession(
    @Res() res: Response,
    @Body() credentials: CredentialsDTO,
    @CookieParam("rt") refreshToken: string
  ) {
    const newSession = await this.sessionService.create(
      credentials,
      refreshToken
    );

    return res
      .cookie("at", newSession.accessToken, sessionCookieConfig)
      .cookie("rt", newSession.refreshToken, sessionCookieConfig)
      .status(201)
      .json({ data: { message: "Success" } });
  }

  @Post("/tokens")
  async createTokens(
    @Res() res: Response,
    @CookieParam("rt") refreshToken: string
  ) {
    const refreshedSession = await this.sessionService.refreshSession(
      refreshToken
    );

    return res
      .cookie("at", refreshedSession.accessToken, sessionCookieConfig)
      .cookie("rt", refreshedSession.refreshToken, sessionCookieConfig)
      .json({ data: { message: "Success" } });
  }
}
