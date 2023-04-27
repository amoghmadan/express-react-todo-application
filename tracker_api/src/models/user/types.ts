import { Document, Types } from "mongoose";

export interface IItem {
  _id?: Types.ObjectId;
  text: string;
  done?: boolean;
  created?: Date;
  updated?: Date;
}

export interface IToken {
  _id?: Types.ObjectId;
  key: string;
  created?: Date;
}

export interface IUser extends Document {
  _id?: Types.ObjectId;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  isActive: boolean;
  dateJoined: Date;
  lastLogin?: Date;
  token?: IToken;
  items: IItem[];
}
