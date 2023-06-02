import yargs, { ArgumentsCamelCase, Argv } from "yargs";

import { createsuperuser, runserver } from "./cli";

yargs
  .strict()
  .command(
    "runserver [port] [host]",
    "Run server",
    (setup: Argv): void => {
      setup
        .positional("port", {
          type: "number",
          describe: "Port",
          default: 8000,
        })
        .positional("host", {
          type: "string",
          describe: "Host",
          default: "api",
        });
    },
    async (args: ArgumentsCamelCase): Promise<void> => {
      await runserver(Number(args.port), String(args.host));
    }
  )
  .command(
    "createsuperuser [email] [firstName] [lastName] [password]",
    "Create admin user",
    (setup: Argv): void => {
      setup
        .positional("email", { type: "string", describe: "Email" })
        .positional("firstName", { type: "string", describe: "First name" })
        .positional("lastName", { type: "string", describe: "Last name" })
        .positional("password", { type: "string", describe: "Password" });
    },
    async (args: ArgumentsCamelCase): Promise<void> => {
      await createsuperuser({
        email: args.email,
        firstName: args.firstName,
        lastName: args.lastName,
        password: args.password,
      });
    }
  ).argv;
