import { Router } from "express";
import {
  signup,
  login,
  logout,
  isAuth,
} from "../controllers/auth_controller.js";
import {
  validateSignupSchema,
  validateLoginSchema,
} from "../middlewares/SchemaValidator.js";
import passport from "../middlewares/passport.js";

const router = Router();

router.route("/signup").post(validateSignupSchema, signup);
router.route("/login").post(validateLoginSchema, login);
router
  .route("/logout")
  .post(passport.authenticate("jwt", { session: false }), logout);
router
  .route("/is-auth")
  .get(passport.authenticate("jwt", { session: false }), isAuth);

export default router;
