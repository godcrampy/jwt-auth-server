import mongoose, { Schema } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  roles: string[];
}

const User = mongoose.model<IUser>(
  "user",
  new Schema<IUser>({
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: String,
      },
    ],
  })
);

export default User;
