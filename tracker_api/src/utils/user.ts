import { User } from "../models";
import { IUser } from "../models/user/types";

import { UnauthorizedError } from "../exceptions/http";

export async function getUserByAuthHeader(
  authorization: string | undefined
): Promise<IUser> {
  if (!authorization) throw new UnauthorizedError("Unauthorized");
  const token: string = authorization.split(" ")[1];
  const user: IUser | null = await User.findOne({ "token.key": token });
  if (!user) throw new UnauthorizedError("Unauthorized");
  return user;
}
