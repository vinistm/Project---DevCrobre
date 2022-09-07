import { Router } from "express";
import userLoginController from "../controllers/session/userLogin.controller";
import schemaValidation from "../middlewares/schemaValidation";
import loginSchema from "../schemas/login/login.schema";

const routes = Router();

export const sessionRoutes = () => {
  routes.post("", schemaValidation(loginSchema), userLoginController);

  return routes;
};
