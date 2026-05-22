import { Router } from "express";

const router = Router();

import {
  getMe,
  login,
  register,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
router.post("/register", register);
router.post("/login", login);
router.get("/me", protectedRoute, getMe);
router.patch(
  "/profile",
  protectedRoute,
  upload.single("avatar"),
  updateProfile
);

export default router;
