import { ISessionRepository, Session } from "@/modules/session";

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
}
