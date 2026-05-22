import { Router } from "express";
import {
  createHabit,
  deleteHabit,
  getHabits,
  toggleHabitLog,
  updateHabits,
} from "../controllers/habits.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(protectedRoute);
router.post("/", createHabit);
router.get("/", getHabits);
router.put("/:id", updateHabits);
router.post("/:id/toggle", toggleHabitLog);
router.delete("/:id", deleteHabit);
export default router;
