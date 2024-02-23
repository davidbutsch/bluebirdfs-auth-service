import { ENV } from "./env";

export const defaults: Partial<Record<keyof ENV, string>> = {
  NODE_ENV: "production",
  LOG_PATH: "./logs",
};
