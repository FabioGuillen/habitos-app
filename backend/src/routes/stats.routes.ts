import { Router } from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { getStats } from "../controllers/stats.controller.js";

const router = Router();

router.use(protectedRoute);

router.get("/", getStats);

export default router;
