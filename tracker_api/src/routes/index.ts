import { Router } from "express";

import api from "@/routes/api";

const urlpatterns: Map<string, Router> = new Map<string, Router>([
  ["/api", api],
]);

export default urlpatterns;
