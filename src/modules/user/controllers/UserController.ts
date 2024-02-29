import { Body, Get, HttpCode, JsonController, Post } from "routing-controllers";

import { CreateUserDTO, IUserService } from "@/modules/user";
import { inject, injectable } from "tsyringe";
import { AppError } from "@/errors";
import { StatusCodes } from "http-status-codes";

@injectable()
@JsonController("/users")
export class UserController {
  constructor(@inject("UserService") private userService: IUserService) {}

  @Get("/me")
  getMe() {
    throw new AppError(StatusCodes.NOT_IMPLEMENTED, "Route not implemented.");
  }

  @HttpCode(201)
  @Post("/")
  create(@Body() user: CreateUserDTO) {
    return this.userService.create(user);
  }
}
