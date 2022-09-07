import { Request, Response } from "express";
import updateUserService from "../../services/user/updateUser.service";

const updateUserController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = { id, body: req.body };

  await updateUserService(id, user);

  return res.status(200).json({ message: "User updated!" });
};

export default updateUserController;
