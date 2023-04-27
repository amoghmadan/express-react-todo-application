import { Router } from "express";

import v1 from "@/routes/api/v1";

const urlpatterns: Map<string, Router> = new Map<string, Router>([["/v1", v1]]);

const api: Router = Router();
urlpatterns.forEach((router: Router, pattern: string): void => {
  api.use(pattern, router);
});

export default api;
