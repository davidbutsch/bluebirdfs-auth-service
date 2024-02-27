import { ISessionRepository, Session } from "@/modules/session";

import { redis } from "@/libs";
import { ACCESS_TOKEN_LIFETIME, generateToken } from "@/common";
import { Types } from "mongoose";

export class SessionRepository implements ISessionRepository {
  async findById(id: string): Promise<Session | null> {
    const key = await redis.call("JSON.GET", `session:${id}`, ".");
    if (typeof key === "string") {
      const session: Session = JSON.parse(key);
      return session;
    }

    return null;
  }
  async findByAccessToken(at: string): Promise<Session | null> {
    const searchResults = await redis.call(
      "FT.SEARCH",
      "idx:session",
      `@accessToken:(${at})`
    );

    /**
     * FT.SEARCH return data:
     *  [
     *    1,
     *    'keyName',
     *    [
     *      '$',
     *      'keyData'
     *    ]
     *  ]
     */
    if (Array.isArray(searchResults)) {
      const key = searchResults[2]?.[1];

      if (typeof key === "string") {
        const session: Session = JSON.parse(key);
        return session;
      }
    }

    return null;
  }
  async findByRefreshToken(rt: string): Promise<Session | null> {
    const searchResults = await redis.call(
      "FT.SEARCH",
      "idx:session",
      `@refreshToken:(${rt})`
    );

    if (Array.isArray(searchResults)) {
      const key = searchResults[2]?.[1];

      if (typeof key === "string") {
        const session: Session = JSON.parse(key);
        return session;
      }
    }

    return null;
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
