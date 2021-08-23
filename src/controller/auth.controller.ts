import { secret } from "../config/auth.config";
import DB from "../model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

const db = new DB();
const User = db.user;
const Role = db.role;

export async function signUp(req: Request, res: Response): Promise<void> {
  try {
    const role = await Role.findOne({ name: "user" }).exec();
    if (role === null) {
      res.status(500).send({ message: "Error Finding Role" });
      return;
    }

    const user = new User({
      email: req.body.email,
      name: req.body.name,
      password: bcrypt.hashSync(req.body.password, 8),
      roles: [role._id],
    });

    user.save();
    res.send({ message: "User Registered!" });
  } catch (err) {
    res.status(500).send({ message: err });
  }
}

export async function signIn(req: Request, res: Response): Promise<void> {
  try {
    const user = await User.findOne({
      email: req.body.email,
    })
      .populate("roles", "-__v")
      .exec();

    if (!user) {
      res.status(404).send({ message: "User Not found." });
      return;
    }

    const isPasswordValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      res.status(401).send({ accessToken: null, message: "Invalid Password" });
      return;
    }

    const token = jwt.sign({ id: user._id }, secret, { expiresIn: 86400 });

    res.send({
      id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
}
