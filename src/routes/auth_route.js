import { Router } from "express";
import {
  signup,
  login,
  logout,
  isAuth,
} from "../controllers/auth_controller.js";

const router = Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/is-auth").get(isAuth);

export default router;
