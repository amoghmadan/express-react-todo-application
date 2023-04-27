import { NextFunction, Request, Response } from "express";
import { Model } from "mongoose";

import { User } from "@/models";
import { IUser } from "@/models/user/types";

export default class Authorization {
  private exclude: string[];
  private keyword: string = "Bearer";
  private model: Model<IUser> = User;

  constructor(exclude: string[]) {
    this.exclude = exclude;
  }

  middleware = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> => {
    if (this.exclude.includes(request.path)) return next();
    const authorization: string | undefined =
      request.headers?.authorization || "Bearer Failure";
    const values: string[] = authorization.split(" ");
    if (values.length !== 2) {
      return response.status(401).json({ detail: "Unauthorized" });
    }
    if (this.keyword.toLowerCase() !== values[0].toLowerCase()) {
      return response.status(401).json({ detail: "Unauthorized" });
    }
    const user: IUser | null = await this.model.findOne({
      "token.key": values[1],
    });
    if (!user) {
      return response.status(401).json({ detail: "Unauthorized" });
    }
    return next();
  };
}
