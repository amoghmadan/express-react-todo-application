import { STATUS_CODES } from "http";

import { Request, Response } from "express";
import { ValidationError } from "joi";

import { UserService } from "../../services";
import { ILoginResponse, IUserDetail } from "../../services/user/types";
import { getUserByAuthHeader } from "../../utils/user";
import { loginSchema } from "../../validations/user";
import { ILoginPayload } from "../../validations/user/types";
import { IUser } from "../../models/user/types";

export class UserController {
  private service: UserService = new UserService();

  login = async (request: Request, response: Response): Promise<Response> => {
    try {
      const value: ILoginPayload = await loginSchema.validateAsync(
        request.body
      );
      const data: ILoginResponse | null = await this.service.performLogin(
        value
      );
      if (!data) {
        return response.status(400).json({ detail: "Invalid credentials!" });
      }
      return response.status(201).json(data);
    } catch (err: any) {
      const status = err.status || 500;
      if (err instanceof ValidationError) {
        return response.status(400).json({ detail: "Invalid credentials!" });
      }
      return response
        .status(status)
        .json({ detail: STATUS_CODES[status.toString()] });
    }
  };

  detail = async (request: Request, response: Response): Promise<Response> => {
    try {
      const user: IUser = await getUserByAuthHeader(
        request.headers.authorization
      );
      if (!user) return response.status(401).json({ detail: "Unauthorized" });
      const data: IUserDetail = await this.service.retrieveDetail(user);
      return response.status(200).json(data);
    } catch (err: any) {
      const status = err.status || 500;
      return response
        .status(status)
        .json({ detail: STATUS_CODES[status.toString()] });
    }
  };

  logout = async (request: Request, response: Response): Promise<Response> => {
    try {
      const user: IUser = await getUserByAuthHeader(
        request.headers.authorization
      );
      if (!user) return response.status(401).json({ detail: "Unauthorized" });
      const data: object = await this.service.performLogout(user);
      return response.status(204).json(data);
    } catch (err: any) {
      const status = err.status || 500;
      return response
        .status(status)
        .json({ detail: STATUS_CODES[status.toString()] });
    }
  };
}
