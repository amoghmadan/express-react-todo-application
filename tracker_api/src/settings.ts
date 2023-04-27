import fs from "fs";
import path from "path";

import { IConfig, IDatabase } from "@/interfaces";

export const ENV: string = process.env.TRACKER_ENV || "development";

export const BASE_DIR: string = path.dirname(path.dirname(__filename));

const cnf: IConfig = JSON.parse(
  fs.readFileSync(path.join(BASE_DIR, "resources", `${ENV}.json`), "utf-8")
);

export const HOST: string = cnf.host;

export const PORT: number = cnf.port;

export const DATABASE: IDatabase = cnf.database;

export const AUTH_EXCLUDE_URLS: string[] = ["/api/v1/account/login"];

export const SALT = 12;
