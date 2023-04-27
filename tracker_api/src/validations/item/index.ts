import Joi, { ObjectSchema } from "joi";

export const createItemSchema: ObjectSchema = Joi.object({
  text: Joi.string().min(1).required(),
  done: Joi.boolean(),
});

export const updateItemSchema: ObjectSchema = Joi.object({
  text: Joi.string().min(1).required(),
  done: Joi.boolean(),
});

export const partialUpdateItemSchema: ObjectSchema = Joi.object({
  text: Joi.string().min(1),
  done: Joi.boolean(),
});
