import { ACCESS_TOKEN_LIFETIME, generateToken } from "@/common";
import { ISessionRepository, Session } from "@/modules/session";

import { Types } from "mongoose";
import { redis } from "@/libs";

export class SessionRepository implements ISessionRepository {
  async findById(id: string): Promise<Session | null> {
    const key = await redis.call("JSON.GET", `session:${id}`, ".");
    if (typeof key === "string") {
      const session: Session = JSON.parse(key);
      return session;
    }

    return null;
  }
  findByAccessToken(at: string): Promise<Session | null> {
    throw new Error("Method not implemented.");
  }
  findByRefreshToken(rt: string): Promise<Session | null> {
    throw new Error("Method not implemented.");
  }
  async create(userId: Types.ObjectId | string) {
    const currentDate = new Date();
    const expiresAtDate = new Date(
      currentDate.getTime() + ACCESS_TOKEN_LIFETIME
    );

    const newSession: Session = {
      id: generateToken(),
      userId: userId.toString(),
      accessToken: generateToken(),
      refreshToken: generateToken(),
      expiresAt: expiresAtDate.toISOString(),
      updatedAt: currentDate.toISOString(),
    };

    await redis.call(
      "JSON.SET",
      `session:${newSession.id}`,
      "$",
      JSON.stringify(newSession)
    );

    return newSession;
  }
}