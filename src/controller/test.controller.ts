import { Request, Response } from "express";
import { IUserRequest } from "../middleware/authJwt";

export function publicAccess(_req: Request, res: Response): void {
  res.send("Public Content.");
}

export async function loginAccess(
  req: IUserRequest,
  res: Response
): Promise<void> {
  const user = req.user;
  if (!user) {
    res.status(404).send({ message: "Invalid token!" });
    return;
  }
  res.send(user);
}

export function adminAccess(_req: Request, res: Response): void {
  res.send("Admin Access!");
}
