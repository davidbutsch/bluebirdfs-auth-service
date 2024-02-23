import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { NextFunction, Request, Response } from "express";

import { AppError } from "@/errors";
import { StatusCodes } from "http-status-codes";

@Middleware({ type: "after" })
export class FinalRequestMiddleware implements ExpressMiddlewareInterface {
  public use(_req: Request, res: Response, next: NextFunction): void {
    if (!res.headersSent) {
      next(new AppError(StatusCodes.NOT_FOUND, "Route not found"));
    }
    res.end();
  }
}
