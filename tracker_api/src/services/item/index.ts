import { Model } from "mongoose";

import { NotFoundError } from "../../exceptions/http";
import { User } from "../../models";
import { IItem, IUser } from "../../models/user/types";
import { IPartialUpdateItem } from "../../validations/item/types";

export class ItemService {
  private model: Model<IUser> = User;

  getItem = async (user: IUser, id: string): Promise<IItem> => {
    const obj: IUser | null = await this.model.findById(user._id, {
      items: { $elemMatch: { _id: id } },
    });
    if (!obj) throw NotFoundError;
    if (obj.items.length === 0) throw NotFoundError;
    return obj.items[0];
  };

  createItem = async (user: IUser, payload: IItem): Promise<IItem> => {
    user.items.push(payload);
    await user.save();
    return payload;
  };

  listItem = async (user: IUser): Promise<IItem[]> => {
    const items: IItem[] = user.items.sort((i1: IItem, i2: IItem): number => {
      const n1: number = i2.created?.getMilliseconds() || 0;
      const n2: number = i1.created?.getMilliseconds() || 0;
      return n2 - n1;
    });
    return items;
  };

  retrieveItem = async (user: IUser, id: string): Promise<IItem> => {
    const item: IItem = await this.getItem(user, id);
    return item;
  };

  updateItem = async (
    user: IUser,
    id: string,
    payload: IItem
  ): Promise<IItem> => {
    const item: IItem = await this.getItem(user, id);
    // await this.model.findByIdAndUpdate(user._id, {
    //   $push: { "items.$": payload },
    // });
    return payload;
  };

  partialUpdateItem = async (
    user: IUser,
    id: string,
    payload: IPartialUpdateItem
  ): Promise<IItem> => {
    const item: IItem = await this.getItem(user, id);
    // const data: any = {};
    // if (payload.hasOwnProperty("text")) data["items.$.text"] = payload.text;
    // if (payload.hasOwnProperty("done")) data["items.$.done"] = payload.done;
    // await this.model.findByIdAndUpdate(
    //   user._id,
    //   { $set: data },
    //   { arrayFilters: [{ "items._id": item._id }] }
    // );
    return item;
  };

  destroyItem = async (user: IUser, id: string): Promise<object> => {
    const item: IItem = await this.getItem(user, id);
    await this.model.findByIdAndUpdate(
      user._id,
      { $pull: { items: { _id: item._id } } },
      { new: true }
    );
    return {};
  };
}
