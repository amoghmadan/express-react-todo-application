import { STATUS_CODES } from "http";

import { Request, Response } from "express";
import { ValidationError } from "joi";

import { IItem, IUser } from "../../models/user/types";
import { ItemService } from "../../services";
import {
  createItemSchema,
  partialUpdateItemSchema,
  updateItemSchema,
} from "../../validations/item";
import { IPartialUpdateItem } from "../../validations/item/types";
import { getUserByAuthHeader } from "../../utils/user";

export class ItemController {
  private service: ItemService = new ItemService();

  create = async (request: Request, response: Response): Promise<Response> => {
    try {
      const user: IUser = await getUserByAuthHeader(
        request.headers.authorization
      );
      const value: IItem = await createItemSchema.validateAsync(request.body);
      const data: IItem = await this.service.createItem(user, value);
      return response.status(201).json(data);
    } catch (err: any) {
      const status = err.status || 500;
      return response
        .status(status)
        .json({ detail: STATUS_CODES[status.toString()] });
    }
  };

  list = async (request: Request, response: Response): Promise<Response> => {
    try {
      const user: IUser = await getUserByAuthHeader(
        request.headers.authorization
      );
      const data: IItem[] = await this.service.listItem(user);
      return response.status(200).json(data);
    } catch (err: any) {
      const status = err.status || 500;
      return response
        .status(status)
        .json({ detail: STATUS_CODES[status.toString()] });
    }
  };

  retrieve = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    try {
      const user: IUser = await getUserByAuthHeader(
        request.headers.authorization
      );
      const data = await this.service.retrieveItem(user, request.params.id);
      return response.status(200).json(data);
    } catch (err: any) {
      const status = err.status || 500;
      return response
        .status(status)
        .json({ detail: STATUS_CODES[status.toString()] });
    }
  };

  update = async (request: Request, response: Response): Promise<Response> => {
    try {
      const user: IUser = await getUserByAuthHeader(
        request.headers.authorization
      );
      const value: IItem = await updateItemSchema.validateAsync(request.body);
      const data = await this.service.updateItem(
        user,
        request.params.id,
        value
      );
      return response.status(200).json(data);
    } catch (err: any) {
      const status = err.status || 500;
      if (err instanceof ValidationError) {
        return response.status(400).json(err);
      }
      return response
        .status(status)
        .json({ detail: STATUS_CODES[status.toString()] });
    }
  };

  partialUpdate = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    try {
      const user: IUser = await getUserByAuthHeader(
        request.headers.authorization
      );
      const value: IPartialUpdateItem =
        await partialUpdateItemSchema.validateAsync(request.body);
      const data: IItem = await this.service.partialUpdateItem(
        user,
        request.params.id,
        value
      );
      return response.status(200).json(data);
    } catch (err: any) {
      const status = err.status || 500;
      if (err instanceof ValidationError) {
        return response.status(400).json(err);
      }
      return response
        .status(status)
        .json({ detail: STATUS_CODES[status.toString()] });
    }
  };

  destory = async (request: Request, response: Response): Promise<Response> => {
    try {
      const user: IUser = await getUserByAuthHeader(
        request.headers.authorization
      );
      const data: object = await this.service.destroyItem(
        user,
        request.params.id
      );
      return response.status(204).json(data);
    } catch (err: any) {
      const status = err.status || 500;
      return response
        .status(status)
        .json({ detail: STATUS_CODES[status.toString()] });
    }
  };
}
