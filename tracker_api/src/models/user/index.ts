import { Model, Schema, model } from "mongoose";

import { IUser } from "./types";

const itemSchema: Schema = new Schema(
  {
    text: { type: String, required: true },
    done: { type: Boolean, required: true, default: false },
  },
  { timestamps: { createdAt: "created", updatedAt: "updated" } }
);

const tokenSchema: Schema = new Schema(
  {
    key: { type: String, required: true, unique: true },
  },
  { timestamps: { createdAt: "created" } }
);

const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  isActive: { type: Boolean, required: true, default: true },
  dateJoined: { type: Date, required: true, default: Date.now },
  lastLogin: { type: Date, required: false },
  token: { type: tokenSchema, required: false },
  items: [itemSchema],
});

const User: Model<IUser> = model<IUser>("User", userSchema);

export default User;
