import jwt from "jsonwebtoken";
import DB from "../model";
import { secret } from "../config/auth.config";
import { Response, Request, NextFunction } from "express";
import { IUser } from "../model/user.model";
import { Document } from "mongoose";

const db = new DB();
const User = db.user;

export interface IUserRequest extends Request {
  user?: IUser & Document;
}

export interface IUserId {
  id?: string;
}

export async function verifyToken(
  req: IUserRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.status(403).send({ message: "No token provided" });
    return;
  }

  try {
    const decoded = <IUserId>jwt.verify(<string>token, secret);
    const userId = decoded.id;
    const user = await User.findById(userId).exec();

    if (!user) {
      res.status(401).send({ message: "Invalid Token" });
      return;
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ message: "Unauthorized!" });
  }
}

export async function isAdmin(
  req: IUserRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = req.user;
    if (!user) {
      res.status(500).send({ message: "User not found!" });
      return;
    }

    if (user.roles.includes(db.ADMIN_ROLE)) {
      next();
      return;
    }

    res.status(403).send({ message: "Admin role required" });
  } catch (err) {
    res.status(500).send({ message: err });
  }
}
