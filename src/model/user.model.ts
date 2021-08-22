import mongoose, { Schema } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  roles: Schema.Types.ObjectId[];
}

const User = mongoose.model<IUser>(
  "user",
  new Schema<IUser>({
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: "role",
      },
    ],
  })
);

export default User;
