import type { MongooseOptions } from "mongoose";

export interface IDatabase {
  uri: string;
  options: MongooseOptions;
}

export interface IConfig {
  host: string;
  port: number;
  database: IDatabase;
}
