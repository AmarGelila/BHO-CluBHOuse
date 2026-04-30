import { body } from "express-validator";
import { dbGetUserByEmail } from "../database/queries.js";

const signUpValidator = [
  body("fullName").trim().notEmpty().isLength({ max: 20, min: 4 }),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("An Email Address is required.")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .custom(async (value) => {
      const user = await dbGetUserByEmail(value);
      if (user) throw new Error("This email already exists , Try to log in");
      return true;
    }),
  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
      minNumbers: 1,
    })
    .withMessage(
      "Password must be more than 8 charcters and includes caps, numbers, and symbols",
    ),
  body("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("The password doesnot match"),
];

const sendMessageValidator = [
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message should not be empty")
    .escape(),
];
export { signUpValidator, sendMessageValidator };
