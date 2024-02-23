import { ISessionService } from "@/modules/session";
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { inject, injectable } from "tsyringe";

import { NextFunction, Request, Response } from "express";
import { AppError } from "@/errors";
import { StatusCodes } from "http-status-codes";

@injectable()
@Middleware({ type: "before" })
export class AttachSession implements ExpressMiddlewareInterface {
  constructor(
    @inject("SessionService") private sessionService: ISessionService
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.cookies.at;
    const session = await this.sessionService.findByAccessToken(accessToken);

    if (!session)
      throw new AppError(StatusCodes.UNAUTHORIZED, "Session not found");

    const isExpired = this.sessionService.isSessionExpired(session);
    if (isExpired)
      throw new AppError(StatusCodes.UNAUTHORIZED, "Session access expired");

    res.locals.session = session;

    next();
  }
}
