import { secret } from "../config/auth.config";
import DB from "../model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

const db = new DB();
const User = db.user;
const Role = db.role;

export function signUp(req: Request, res: Response): void {
  Role.findOne({ name: "user" }).exec((err, role) => {
    if (err || role === null) {
      res.status(500).send({ message: err });

      return;
    }

    const user = new User({
      email: req.body.email,
      name: req.body.name,
      password: bcrypt.hashSync(req.body.password, 8),
      roles: [role._id],
    });

    user.save((err, _) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({ message: "User Registered!" });
    });
  });
}

export function signIn(req: Request, res: Response): void {
  User.findOne({
    email: req.body.email,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        res.status(404).send({ message: "User Not found." });
        return;
      }

      const isPasswordValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!isPasswordValid) {
        res
          .status(401)
          .send({ accessToken: null, message: "Invalid Password" });
        return;
      }

      const token = jwt.sign({ id: user._id }, secret, { expiresIn: 86400 });

      res.send({
        id: user._id,
        name: user.name,
        email: user.email,
        token,
      });
    });
}
