import { Credentials as GoogleCredentials } from "google-auth-library";
import { IOAuth2Service } from "@/modules/oauth2";
import { config } from "@/common";
import { google } from "googleapis";
import { IUserRepository, IUserService, UserDTO } from "@/modules/user";
import { inject, injectable } from "tsyringe";
import { AppError } from "@/errors";
import { StatusCodes } from "http-status-codes";
import { ISessionService } from "@/modules/session";

const CALLBACK_URL =
  "https://bluebirdfs.net/auth/api/v1/oauth2/google/callback";

const SCOPE = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
];

@injectable()
export class GoogleOAuth2Service implements IOAuth2Service {
  private googleAuthClient = new google.auth.OAuth2(
    config.googleClient.id,
    config.googleClient.secret,
    CALLBACK_URL
  );

  constructor(
    @inject("UserService") private userService: IUserService,
    @inject("UserRepository") private userRepository: IUserRepository,
    @inject("SessionService") private sessionService: ISessionService
  ) {}

  getAuthUrl(state?: { [key: string]: string }): string {
    const url = this.googleAuthClient.generateAuthUrl({
      scope: SCOPE,
      prompt: "consent",
      access_type: "offline",
      state: JSON.stringify(state),
    });

    return url;
  }
  async getTokens(code: string) {
    const { tokens } = await this.googleAuthClient.getToken(code);
    return tokens;
  }
  async createAuthProviderUser(credentials: GoogleCredentials) {
    this.googleAuthClient.setCredentials({
      access_token: credentials.access_token,
    });
    const oauth2 = google.oauth2({
      auth: this.googleAuthClient,
      version: "v2",
    });
    const { data } = await oauth2.userinfo.get();

    if (!(data.email && data.given_name))
      throw new AppError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Missing Google user email key"
      );

    let user: UserDTO;

    const userWithThisEmail = await this.userRepository.findByEmail(
      data.email,
      {
        lean: true,
      }
    );

    if (!userWithThisEmail)
      user = await this.userService.create({
        email: data.email,
        firstName: data.given_name,
        lastName: data.family_name || undefined,
      });
    else user = UserDTO.toDTO(userWithThisEmail);

    return user;
  }
}