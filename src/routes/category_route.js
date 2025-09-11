import { Router } from "express";
import { getAllCategories } from "../controllers/category_controller.js";

const router = Router();

router.route("/").get(getAllCategories);

export default router;
