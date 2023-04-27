import { Interface, createInterface } from "readline";

import { hashSync } from "bcryptjs";
import Joi, { Schema, ValidationResult } from "joi";
import mongoose from "mongoose";

import { PasswordDoNotMatchError } from "@/exceptions";
import { User } from "@/models";
import { IUser } from "@/models/user/types";
import { DATABASE, SALT } from "@/settings";

interface IInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
}

const userSchema: Schema = Joi.object({
  email: Joi.string().email(),
  firstName: Joi.string().min(3),
  lastName: Joi.string().min(1),
  passwd: Joi.string().min(3),
});

const cli: Interface = createInterface({
  input: process.stdin,
  output: process.stdout,
});

cli.question("Email: ", (email: string): void => {
  cli.question("First name: ", (firstName: string): void => {
    cli.question("Last name: ", (lastName: string): void => {
      cli.question("Password: ", (passwd: string): void => {
        cli.question("Confirm password: ", (confirmPassword): void => {
          cli.close();
          if (passwd !== confirmPassword) {
            throw PasswordDoNotMatchError;
          }
          const result: ValidationResult = userSchema.validate({
            email,
            passwd,
            firstName,
            lastName,
          });
          if (result.error) {
            console.error(result.error);
            process.exit(1);
          }
          const password: string = hashSync(result.value.passwd, SALT);
          const input: IInput = {
            email: result.value.email,
            password,
            firstName: result.value.firstName,
            lastName: result.value.lastName,
            isAdmin: true,
          };
          const newUser: IUser = new User(input);
          mongoose
            .connect(DATABASE.uri, DATABASE.options)
            .then((): void => {
              newUser.save().catch((err: unknown): void => {
                throw err;
              });
            })
            .catch((err: unknown): void => {
              throw err;
            });
          console.log("User added successfully!");
        });
      });
    });
  });
});
