import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import createUserService from "../../services/user/createUser.service";

const createUserController = async (req: Request, res: Response) => {
  const data = { body: req.body };

  const newUser = await createUserService(data);
  return res.status(201).send(instanceToPlain(newUser));
};

export default createUserController;
