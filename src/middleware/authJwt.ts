import jwt from "jsonwebtoken";
import DB from "../model";
import { secret } from "../config/auth.config";
import { Response, Request, NextFunction } from "express";

const db = new DB();
const User = db.user;
const Role = db.role;

export interface IUserIdRequest extends Request {
  userId?: string;
}

export function verifyToken(
  req: IUserIdRequest,
  res: Response,
  next: NextFunction
): void {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.status(403).send({ message: "No token provided" });
    return;
  }

  jwt.verify(<string>token, secret, (err, decoded) => {
    if (err || decoded === undefined) {
      res.status(401).send({ message: "Unauthorized!" });
      return;
    }

    req.userId = decoded.id;
    next();
  });
}

export function isAdmin(
  req: IUserIdRequest,
  res: Response,
  next: NextFunction
): void {
  User.findById(req.userId).exec((err, user) => {
    if (err || user === null) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (const role of roles) {
          if (role.name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Admin role required" });
      }
    );
  });
}
