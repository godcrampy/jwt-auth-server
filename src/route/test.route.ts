import express from "express";
import {
  adminAccess,
  loginAccess,
  publicAccess,
} from "../controller/test.controller";
import { isAdmin, verifyToken } from "../middleware/authJwt";

const router = express.Router();

router.get("/public", publicAccess);

router.get("/user", [verifyToken], loginAccess);

router.get("/admin", [verifyToken, isAdmin], adminAccess);

export default router;
