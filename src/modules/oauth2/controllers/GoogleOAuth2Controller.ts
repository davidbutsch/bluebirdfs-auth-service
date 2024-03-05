import {
  Get,
  JsonController,
  QueryParams,
  Redirect,
  Res,
} from "routing-controllers";

import { inject, injectable } from "tsyringe";
import { IOAuth2Service, GoogleOAuth2CallbackQuery } from "@/modules/oauth2";
import { AppError } from "@/errors";
import { StatusCodes } from "http-status-codes";
import { ISessionService } from "@/modules/session";

import { Response } from "express";
import { SERVICE_HOME_PATH, sessionCookieConfig } from "@/common";

@injectable()
@JsonController("/oauth2/google")
export class GoogleOAuth2Controller {
  constructor(
    @inject("GoogleOAuth2Service") private googleOAuth2Service: IOAuth2Service,
    @inject("SessionService") private sessionService: ISessionService
  ) {}

  @Get("/url")
  getAuthUrl() {
    const url = this.googleOAuth2Service.getAuthUrl();

    return {
      data: { url },
    };
  }

  @Redirect(SERVICE_HOME_PATH)
  @Get("/callback")
  async callback(
    @QueryParams({ validate: { forbidNonWhitelisted: false } })
    query: GoogleOAuth2CallbackQuery,
    @Res() res: Response
  ) {
    if (query.error) throw new AppError(StatusCodes.UNAUTHORIZED, query.error);
    if (!query.code)
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        "query param `code` required"
      );

    const state = query.state ? JSON.parse(query.state) : undefined;

    const tokens = await this.googleOAuth2Service.getTokens(query.code);

    const user = await this.googleOAuth2Service.createAuthProviderUser(tokens);

    const session = await this.sessionService.create(user.id);

    res
      .cookie("at", session.accessToken, sessionCookieConfig)
      .cookie("rt", session.refreshToken, sessionCookieConfig);

    return state?.redirectUrl;
  }
}
