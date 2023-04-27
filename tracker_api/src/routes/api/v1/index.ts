import { Router } from "express";

import account from "@/routes/api/v1/account";
import task from "@/routes/api/v1/task";

const urlpatterns: Map<string, Router> = new Map<string, Router>([
  ["/account", account],
  ["/task", task],
]);

const v1: Router = Router();
urlpatterns.forEach((router: Router, pattern: string): void => {
  v1.use(pattern, router);
});

export default v1;
