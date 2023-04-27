import { User } from "../models";
import { IUser } from "../models/user/types";

import { InvalidTokenError } from "../exceptions";

export async function getUserByAuthHeader(
  authorization: string | undefined
): Promise<IUser> {
  if (!authorization) throw InvalidTokenError;
  const token: string = authorization.split(" ")[1];
  const user: IUser | null = await User.findOne({ "token.key": token });
  if (!user) throw InvalidTokenError;
  return user;
}
