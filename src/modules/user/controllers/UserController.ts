import {
  Body,
  Delete,
  Get,
  HttpCode,
  JsonController,
  Patch,
  Post,
  Res,
  UseBefore,
} from "routing-controllers";

import { Response } from "express";

import { CreateUserDTO, IUserService, UpdateUserDTO } from "@/modules/user";
import { inject, injectable } from "tsyringe";
import { AttachSession } from "@/middlewares";

@injectable()
@JsonController("/users")
export class UserController {
  constructor(@inject("UserService") private userService: IUserService) {}

  @UseBefore(AttachSession)
  @Get("/me")
  async getMe(@Res() res: Response) {
    const session = res.locals.session;

    const user = await this.userService.findById(session.userId);

    return {
      data: { user },
    };
  }

  @HttpCode(201)
  @Post("/")
  async create(@Body() user: CreateUserDTO) {
    const newUser = await this.userService.create(user);

    return {
      data: { user: newUser },
    };
  }

  @UseBefore(AttachSession)
  @Patch("/me")
  async updateMe(
    @Res() res: Response,
    @Body({
      validate: {
        skipUndefinedProperties: true,
      },
    })
    userUpdate: UpdateUserDTO
  ) {
    const session = res.locals.session;

    const user = await this.userService.update(session.userId, userUpdate);

    return {
      data: { user },
    };
  }
}
