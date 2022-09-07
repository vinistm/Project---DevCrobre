import { Response, Request } from "express";
import { instanceToPlain } from "class-transformer";

import listUserService from "../../services/user/listOneUser.service";

const listOneUserController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await listUserService(Number(id));

  res.status(200).send(instanceToPlain(user));
};

export default listOneUserController;
