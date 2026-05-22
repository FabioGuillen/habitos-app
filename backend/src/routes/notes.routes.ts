import { Router } from "express";
import {
  createOrUpdateNote,
  deleteNote,
  getDayNote,
  getMonthNotes,
} from "../controllers/notes.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(protectedRoute);

router.post("/", createOrUpdateNote);
router.get("/", getMonthNotes);
router.get("/day", getDayNote);
router.delete("/:id", deleteNote);

export default router;
