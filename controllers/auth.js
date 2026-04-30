import { validationResult, matchedData } from "express-validator";
import { dbAddUser } from "../database/queries.js";
import bcrypt from "bcryptjs";

async function postSignUp(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const { fullName, email } = req.body;
    res.render("sign-up", {
      errors: errors.mapped(),
      values: { fullName, email },
    });
    return;
  }

  const { fullName, email, password } = matchedData(req);
  const hashedPassword = await bcrypt.hash(password, 10);
  await dbAddUser(fullName, email, hashedPassword);
  res.render("confirm", {
    title: "Signed Up",
    message: `You have successfully signed up ${fullName} click the button below to go to log in page.`,
    link: "/log-in",
    linkText: "Log In",
  });
}

function getLogIn(req, res) {
  res.locals.errors = req.flash("error");
  res.render("log-in");
}

export { postSignUp, getLogIn };
