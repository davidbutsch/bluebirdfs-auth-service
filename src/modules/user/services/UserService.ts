import { Types } from "mongoose";
import {
  IUserRepository,
  UserDTO,
  IUserService,
  CreateUserDTO,
  UpdateUserDTO,
  User,
} from "@/modules/user";

import { CredentialsDTO } from "@/modules/session";
import { inject, injectable } from "tsyringe";
import { AppError } from "@/errors";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import { objectToDotNotation } from "@/common";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async findById(id: string): Promise<UserDTO> {
    const user = await this.userRepository.findById(id);

    if (!user) throw new AppError(StatusCodes.NOT_FOUND, "User not found");

    return UserDTO.toDTO(user);
  }
  async authenticateUser(credentials: CredentialsDTO): Promise<UserDTO> {
    const user = await this.userRepository.findByEmail(credentials.email);

    if (!user)
      throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid credentials");

    if (!user.security.password)
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        "Email registered with social account"
      );

    const passwordsMatch = await bcrypt.compare(
      credentials.password,
      user.security.password
    );

    if (!passwordsMatch)
      throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid credentials");

    return UserDTO.toDTO(user);
  }
  async create(user: CreateUserDTO): Promise<UserDTO> {
    const userWithThisEmail = await this.userRepository.findByEmail(
      user.email,
      {
        lean: true,
      }
    );

    if (userWithThisEmail)
      throw new AppError(StatusCodes.CONFLICT, "Email already taken");

    const newUser: Partial<User> = {
      profile: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        thumbnail: "https://notimplemented.com/cdn/thumbnail.png", // TODO add thumbnail link utility
      },
      security: {
        password: await bcrypt.hash(user.password, 10),
      },
    };

    const newUserDoc = await this.userRepository.create(newUser);

    return UserDTO.toDTO(newUserDoc);
  }
  async update(id: string, update: UpdateUserDTO): Promise<UserDTO> {
    const updatedUserDoc = await this.userRepository.update(
      id,
      { $set: objectToDotNotation(update) },
      {
        new: true,
      }
    );

    if (!updatedUserDoc)
      throw new AppError(StatusCodes.NOT_FOUND, "User not found");

    return UserDTO.toDTO(updatedUserDoc);
  }
  delete(id: string | Types.ObjectId | undefined): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
