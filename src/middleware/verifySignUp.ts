import { Response, Request, NextFunction } from "express";
import DB from "../model";

const db = new DB();
const User = db.user;

export async function checkDuplicateUserNameOrEmail(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = await User.findOne({
      email: req.body.email,
    }).exec();
    if (user) {
      res.status(400).send({ message: "Email is already in use" });
      return;
    }
    next();
  } catch (err) {
    res.status(500).send({ message: err });
  }
}
