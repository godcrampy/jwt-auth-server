import { Response, Request, NextFunction } from "express";
import { CallbackError } from "mongoose";
import DB from "../model";

const db = new DB();
const User = db.user;

export function checkDuplicateUserNameOrEmail(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  User.findOne({
    email: req.body.email,
  }).exec((err: CallbackError, user): void => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Email is already in use" });
      return;
    }
    next();
  });
}
