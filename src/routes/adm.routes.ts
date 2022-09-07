import { Router } from "express";
import createAdmController from "../controllers/adm/createAdm.controller";

const routes = Router();

export const admRoutes = () => {
  routes.post("/ti/create/user", createAdmController);

  return routes;
};
