import { Router } from "express";
import {
  deleteAddress,
  editAddress,
  addNewAddress,
} from "../controllers/address_controller.js";
import passport from "../middlewares/passport.js";
const router = Router();

router
  .route("/")
  .post(passport.authenticate("jwt", { session: false }), addNewAddress);
router
  .route("/:id")
  .delete(passport.authenticate("jwt", { session: false }), deleteAddress);
router
  .route("/:id")
  .put(passport.authenticate("jwt", { session: false }), editAddress);

export default router;
