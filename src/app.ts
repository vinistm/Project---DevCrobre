import express from "express";
import "reflect-metadata";
import { appRoutes } from "./routes";
import "express-async-errors";
import handleError from "./middlewares/handleError";

const app = express();
app.use(express.json());
appRoutes(app);

app.use(handleError);

export default app;
