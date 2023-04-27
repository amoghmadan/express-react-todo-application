import { Request, Response } from "express";
import { ValidationError } from "joi";

import { IItem, IUser } from "../../models/user/types";
import { ItemService } from "../../services";
import { getUserByAuthHeader } from "../../utils/user";
import {
  createItemSchema,
  partialUpdateItemSchema,
  updateItemSchema,
} from "../../validations/item";
import { IPartialUpdateItem } from "../../validations/item/types";

export class ItemController {
  private service: ItemService = new ItemService();

  create = async (request: Request, response: Response): Promise<Response> => {
    const user: IUser = await getUserByAuthHeader(
      request.headers.authorization
    );
    try {
      const value: IItem = await createItemSchema.validateAsync(request.body);
      const data: IItem = await this.service.createItem(user, value);
      return response.status(201).json(data);
    } catch (err: unknown) {
      if (err instanceof ValidationError) {
        return response.status(400).json(err);
      }
      return response.status(500).json({ detail: "Internal Server Error" });
    }
  };

  list = async (request: Request, response: Response): Promise<Response> => {
    const user: IUser = await getUserByAuthHeader(
      request.headers.authorization
    );
    const data = await this.service.listItem(user);
    return response.status(200).json(data);
  };

  retrieve = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const user: IUser = await getUserByAuthHeader(
      request.headers.authorization
    );
    try {
      const data = await this.service.retrieveItem(user, request.params.id);
      return response.status(200).json(data);
    } catch (err: unknown) {
      return response.status(404).json({ detail: "Not Found" });
    }
  };

  update = async (request: Request, response: Response): Promise<Response> => {
    const user: IUser = await getUserByAuthHeader(
      request.headers.authorization
    );
    try {
      const value: IItem = await updateItemSchema.validateAsync(request.body);
      const data = await this.service.updateItem(
        user,
        request.params.id,
        value
      );
      return response.status(200).json(data);
    } catch (err: unknown) {
      if (err instanceof ValidationError) {
        return response.status(400).json(err);
      }
      return response.status(404).json({ detail: "Not Found" });
    }
  };

  partialUpdate = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const user: IUser = await getUserByAuthHeader(
      request.headers.authorization
    );
    try {
      const value: IPartialUpdateItem =
        await partialUpdateItemSchema.validateAsync(request.body);
      const data: IItem = await this.service.partialUpdateItem(
        user,
        request.params.id,
        value
      );
      return response.status(200).json(data);
    } catch (err: unknown) {
      if (err instanceof ValidationError) {
        return response.status(400).json(err);
      }
      return response.status(404).json({ detail: "Not Found" });
    }
  };

  destory = async (request: Request, response: Response): Promise<Response> => {
    const user: IUser = await getUserByAuthHeader(
      request.headers.authorization
    );
    try {
      const data: object = await this.service.destroyItem(
        user,
        request.params.id
      );
      return response.status(204).json(data);
    } catch (err: unknown) {
      if (err instanceof ValidationError) {
        return response.status(400).json(err);
      }
      return response.status(404).json({ detail: "Not Found" });
    }
  };
}
