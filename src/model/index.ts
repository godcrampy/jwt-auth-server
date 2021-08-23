import mongoose from "mongoose";
import User from "./user.model";

class DB {
  mongoose = mongoose;
  user = User;
  ADMIN_ROLE = "ADMIN";
  USER_ROLE = "USER";
}

export default DB;
