import mongoose from "mongoose";
import Role, { ROLES } from "./role.model";
import User from "./user.model";

class DB {
  mongoose = mongoose;
  user = User;
  role = Role;
  roles = ROLES;
}

export default DB;
