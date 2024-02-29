import {
  Body,
  Get,
  HttpCode,
  JsonController,
  Post,
  Res,
  UseBefore,
} from "routing-controllers";

import { Response } from "express";

import { CreateUserDTO, IUserService } from "@/modules/user";
import { inject, injectable } from "tsyringe";
import { AttachSession } from "@/middlewares";

@injectable()
@JsonController("/users")
export class UserController {
  constructor(@inject("UserService") private userService: IUserService) {}

  @UseBefore(AttachSession)
  @Get("/me")
  getMe(@Res() res: Response) {
    const session = res.locals.session;

    return this.userService.findById(session.userId);
  }

  @HttpCode(201)
  @Post("/")
  create(@Body() user: CreateUserDTO) {
    return this.userService.create(user);
  }
}
