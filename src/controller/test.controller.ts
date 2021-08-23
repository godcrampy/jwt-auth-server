import { Request, Response } from "express";
import { IUserIdRequest } from "../middleware/authJwt";
import DB from "../model";

const db = new DB();
const User = db.user;

export function publicAccess(_req: Request, res: Response): void {
  res.send("Public Content.");
}

export function loginAccess(req: IUserIdRequest, res: Response): void {
  const userId = req.userId;
  User.findById(userId)
    .populate("roles")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        res.status(404).send({ message: "Invalid token!" });
        return;
      }

      res.send(user);
    });
}

export function adminAccess(_req: Request, res: Response): void {
  res.send("Admin Access!");
}
