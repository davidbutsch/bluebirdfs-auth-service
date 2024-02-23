import {
  ExpressErrorMiddlewareInterface,
  Middleware,
} from "routing-controllers";
import { Request, Response } from "express";

import { ErrorResponse } from "@/errors";
import { env } from "@/common";
import { serializeError } from "serialize-error-cjs";

@Middleware({ type: "after" })
export class UnknownErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, _req: Request, res: Response): void {
    const errorResponse: ErrorResponse = {
      code: error.statusCode || error.code || error.status,
      status: error.name || "InternalError",
      message: error.message || "Unexpected error occured",
    };

    if (typeof errorResponse.code !== "number") errorResponse.code = 500;
    if (env.NODE_ENV === "development")
      errorResponse.errors = [serializeError(error)];

    res.status(errorResponse.code).json({ error: errorResponse });
  }
}
