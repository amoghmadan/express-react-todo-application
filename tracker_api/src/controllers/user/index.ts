import { Request, Response } from "express";
import { ValidationError } from "joi";

import { IUser } from "../../models/user/types";
import { UserService } from "../../services";
import { ILoginResponse, IUserDetail } from "../../services/user/types";
import { getUserByAuthHeader } from "../../utils/user";
import { loginSchema } from "../../validations/user";
import { ILoginPayload } from "../../validations/user/types";

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
    } catch (err: unknown) {
      if (err instanceof ValidationError) {
        return response.status(400).json(err);
      }
      return response.status(500).json({ detail: "Internal Server Error" });
    }
  };

  detail = async (request: Request, response: Response): Promise<Response> => {
    const user: IUser = await getUserByAuthHeader(
      request.headers?.authorization
    );
    const data: IUserDetail = await this.service.retrieveDetail(user);
    return response.status(200).json(data);
  };

  logout = async (request: Request, response: Response): Promise<Response> => {
    const user: IUser = await getUserByAuthHeader(
      request.headers?.authorization
    );
    const data: object = await this.service.performLogout(user);
    return response.status(204).json(data);
  };
}
