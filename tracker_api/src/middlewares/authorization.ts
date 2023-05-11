import { STATUS_CODES } from "http";

import { NextFunction, Request, Response } from "express";
import { Model } from "mongoose";

import { ForbiddenError, UnauthorizedError } from "../exceptions/http";
import { User } from "../models";
import { IUser } from "../models/user/types";

export default class Authorization {
  private exclude: string[];
  private keyword = "Bearer";
  private model: Model<IUser> = User;

  constructor(exclude: string[]) {
    this.exclude = exclude;
  }

  middleware = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> => {
    const authorization: string | undefined = request.headers?.authorization;
    try {
      if (!this.exclude.includes(request.path)) {
        if (!authorization) throw new UnauthorizedError();
        const values: string[] = authorization.split(" ");
        if (values.length !== 2) throw new UnauthorizedError();
        if (this.keyword.toLowerCase() !== values[0].toLowerCase()) {
          throw new UnauthorizedError();
        }
        const user: IUser | null = await this.model.findOne({
          "token.key": values[1],
        });
        if (!user) throw new ForbiddenError();
      }
    } catch (err: any) {
      const status: number = err.status || 500;
      return response
        .status(status)
        .json({ detail: STATUS_CODES[status.toString()] });
    } finally {
      next();
    }
  };
}
