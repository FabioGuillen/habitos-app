import { Router } from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import {
  createGoal,
  deleteGoal,
  getGoals,
  updateGoal,
  updateGoalProgress,
} from "../controllers/goals.controller.js";

const router = Router();

router.use(protectedRoute);

router.post("/", createGoal);
router.get("/", getGoals);
router.put("/:id", updateGoal);
router.delete("/:id", deleteGoal);
router.post("/:id/progress", updateGoalProgress);

export default router;
