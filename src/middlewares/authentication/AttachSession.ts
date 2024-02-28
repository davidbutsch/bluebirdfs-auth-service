import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { NextFunction, Request, Response } from "express";
import { container, inject, injectable } from "tsyringe";

import { AppError } from "@/errors";
import { ISessionService } from "@/modules/session";
import { StatusCodes } from "http-status-codes";

@injectable()
@Middleware({ type: "before" })
export class AttachSession implements ExpressMiddlewareInterface {
  private sessionService: ISessionService;

  constructor() {
    this.sessionService = container.resolve("SessionService");
  }

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
