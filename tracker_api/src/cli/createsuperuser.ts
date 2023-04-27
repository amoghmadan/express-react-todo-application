import { hashSync } from "bcryptjs";
import Joi, { ObjectSchema } from "joi";
import mongoose from "mongoose";

import { User } from "../models";
import { IUser } from "../models/user/types";
import { DATABASE, SALT } from "../settings";

const userRegisterSchema: ObjectSchema = Joi.object({
  email: Joi.string().email(),
  firstName: Joi.string().min(3),
  lastName: Joi.string().min(1),
  password: Joi.string().min(3),
});

export async function createsuperuser(args: object): Promise<void> {
  const value: IUser = await userRegisterSchema.validateAsync(args);
  value.password = hashSync(value.password, SALT);
  const newUser: IUser = new User({ ...value, isAdmin: true });
  await mongoose.connect(DATABASE.uri, DATABASE.options);
  await newUser.save();
}
