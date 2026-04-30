import { Router } from "express";
import beMemberRouter from "./be-member.js";
import { getMainPage, postMessage } from "../controllers/main.js";
import { sendMessageValidator } from "../utils/validators.js";
import catchError from "../utils/catchError.js";

const router = Router();

router.get("", catchError(getMainPage));
router.get("/log-out", (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});
router.post("/send-message", sendMessageValidator, catchError(postMessage));

router.use("/be-member", beMemberRouter);

export default router;
