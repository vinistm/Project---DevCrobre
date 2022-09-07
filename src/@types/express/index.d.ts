import * as express from "express";
import { IClientRequest } from "../../interfaces/client";

declare global {
  namespace Express {
    interface Request {
      user: {
        id?: number;
        position?: string;
        email?: string;
      };
    }
  }
}
