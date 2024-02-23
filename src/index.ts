process.title = "bluebirdfs-auth-service";
Error.stackTraceLimit = process.env.NODE_ENV === "production" ? -1 : 10;

import { addAlias } from "module-alias";
addAlias("@", `${__dirname}/`);

import "module-alias/register";
import "reflect-metadata";
import "./handleExit";

import * as libs from "@/libs";

import { env } from "@/common";
import { initializeWorkers } from "@/queue";

libs.Logger.info(
  `bluebirdfs-auth-service with process id of ${process.pid} starting in ${env.NODE_ENV} mode`
);

initializeWorkers();
