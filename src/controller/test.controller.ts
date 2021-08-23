import { Request, Response } from "express";
import { IUserIdRequest } from "../middleware/authJwt";
import DB from "../model";

const db = new DB();
const User = db.user;

export function publicAccess(_req: Request, res: Response): void {
  res.send("Public Content.");
}

export async function loginAccess(
  req: IUserIdRequest,
  res: Response
): Promise<void> {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).populate("roles").exec();

    if (!user) {
      res.status(404).send({ message: "Invalid token!" });
      return;
    }

    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err });
  }
}

export function adminAccess(_req: Request, res: Response): void {
  res.send("Admin Access!");
}
