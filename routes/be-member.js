import { Router } from "express";
import { postBeMember, postBeMemberVerify } from "../controllers/be-member.js";
import catchError from "../utils/catchError.js";

const router = Router();

router
  .route("")
  .get((req, res) => res.render("be-member", { user: req.user }))
  .post(catchError(postBeMember));

router.post("/verify", catchError(postBeMemberVerify));

export default router;
