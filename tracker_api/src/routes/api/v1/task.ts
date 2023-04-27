import { Router } from "express";

import { ItemController } from "../../../controllers";

const controller: ItemController = new ItemController();

const task: Router = Router();
task.route("/items").get(controller.list).post(controller.create);
task
  .route("/items/:id")
  .get(controller.retrieve)
  .put(controller.update)
  .patch(controller.partialUpdate)
  .delete(controller.destory);

export default task;
