import { Router } from "express";
import {
  addToBag,
  getBagItems,
  removeFromBag,
} from "../controllers/user_controller.js";
import passport from "../middlewares/passport.js";

const router = Router();

router
  .route("/bag")
  .post(passport.authenticate("jwt", { session: false }), addToBag);

router
  .route("/bag/:productId")
  .delete(passport.authenticate("jwt", { session: false }), removeFromBag);

router
  .route("/bag")
  .get(passport.authenticate("jwt", { session: false }), getBagItems);

export default router;
