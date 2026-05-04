import { Router } from "express";
import beMemberRouter from "./be-member.js";
import { getMainPage, postMessage, logOut } from "../controllers/main.js";
import { sendMessageValidator } from "../utils/validators.js";
import catchError from "../utils/catchError.js";

const router = Router();

router.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  next();
});

router.use((req, res, next) => {
  if (!req.isAuthenticated()) return res.redirect("/log-in");
  next();
});
router.get("", catchError(getMainPage));
router.get("/log-out", catchError(logOut));
router.post("/send-message", sendMessageValidator, catchError(postMessage));

router.use("/be-member", beMemberRouter);

export default router;
