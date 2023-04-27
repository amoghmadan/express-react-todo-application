import type { MongooseOptions } from "mongoose";

export interface IDatabase {
  uri: string;
  options: MongooseOptions;
}

export interface IConfig {
  database: IDatabase;
}
