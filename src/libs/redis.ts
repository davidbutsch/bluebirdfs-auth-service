import { Logger } from "@/libs";
import Redis from "ioredis";
import { config } from "@/common";

export const redis = new Redis(config.databases.redis.url, {
  lazyConnect: true,
  maxRetriesPerRequest: null,
});

(async () => {
  try {
    await redis.connect();

    Logger.info(
      `Connected to redis on address: '${redis.options.host}:${redis.options.port}'`
    );
  } catch (error) {
    Logger.error(error);
    throw new Error(
      `Error connecting to redis on address: '${redis.options.host}:${redis.options.port}'`
    );
  }
})();
