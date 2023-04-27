import { compareSync } from "bcryptjs";
import { Model } from "mongoose";

import { User } from "@/models";
import { IUser } from "@/models/user/types";
import { ILoginResponse, IUserDetail } from "@/services/user/types";
import { generateKey } from "@/utils/token";
import { ILoginPayload } from "@/validations/user/types";

export class UserService {
  /**
   * User Service to handel Users: Detail, Login and Logout operations.
   */
  private model: Model<IUser> = User;

  performLogin = async (
    payload: ILoginPayload
  ): Promise<ILoginResponse | null> => {
    const user: IUser | null = await this.model.findOne({
      email: payload.email,
      isActive: true,
    });
    if (!user) return null;
    if (!compareSync(payload.password, user.password)) return null;
    if (!user.token) {
      user.token = { key: generateKey() };
      user.lastLogin = user.token.created;
      await user.save();
    }
    return { token: user.token.key };
  };

  retrieveDetail = async (user: IUser): Promise<IUserDetail> => {
    console.log(user);
    const detail: IUserDetail = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      dateJoined: user.dateJoined,
    };
    return detail;
  };

  performLogout = async (user: IUser): Promise<{}> => {
    user.set("token", undefined, { strict: false });
    await user.save();
    return {};
  };
}
