import express from "express";
import { signIn, signUp } from "../controller/auth.controller";
import { checkDuplicateUserNameOrEmail } from "../middleware/verifySignUp";

const router = express.Router();

router.post("/signup", checkDuplicateUserNameOrEmail, signUp);

router.post("/signin", signIn);

export default router;
