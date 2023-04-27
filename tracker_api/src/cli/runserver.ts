import { Server, ServerOptions } from "http";

import express, { Application, Router } from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";

import { Authorization } from "../middlewares";
import urlpatterns from "../routes";
import { AUTH_EXCLUDE_URLS, DATABASE } from "../settings";

export async function runserver(port: number, host: string): Promise<void> {
  const application: Application = express();
  application.use(helmet());
  application.use(express.urlencoded({ extended: true }));
  application.use(express.json());
  application.use(morgan("combined"));
  urlpatterns.forEach((router: Router, pattern: string): void => {
    application.use(pattern, router);
  });
  application.use(new Authorization(AUTH_EXCLUDE_URLS).middleware);

  const serverOptions: ServerOptions = {};
  const server: Server = new Server(serverOptions, application);

  await mongoose.connect(DATABASE.uri, DATABASE.options);
  server.listen(port, host, (): void => {
    console.log(server.address());
  });
}
