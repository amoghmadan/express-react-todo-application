import { Router } from "express";

import { UserController } from "@//controllers";

const controller: UserController = new UserController();

const account: Router = Router();
account.route("/login").post(controller.login);
account.route("/detail").get(controller.detail);
account.route("/logout").delete(controller.logout);

export default account;
