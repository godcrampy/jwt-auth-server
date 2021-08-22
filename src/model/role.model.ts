import mongoose, { Schema } from "mongoose";

export interface IRole {
  name: string;
}

const Role = mongoose.model<IRole>(
  "role",
  new Schema<IRole>({
    name: String,
  })
);

export const ROLES = ["user", "admin", "moderator"];

export default Role;
