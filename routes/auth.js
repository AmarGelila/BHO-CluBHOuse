import { Router } from "express";
import { postSignUp, getLogIn } from "../controllers/auth.js";
import catchError from "../utils/catchError.js";
import { signUpValidator } from "../utils/validators.js";
import passport from "passport";

const router = Router();

router
  .route("/sign-up")
  .get((req, res) => res.render("sign-up"))
  .post(signUpValidator, catchError(postSignUp));
router
  .route("/log-in")
  .get(catchError(getLogIn))
  .post(
    catchError(
      passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/log-in",
        failureFlash: true,
      }),
    ),
  );

export default router;
