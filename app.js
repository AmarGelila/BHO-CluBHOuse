import "dotenv/config";
import express from "express";
import crypto from "crypto";
import session from "express-session";
import flash from "connect-flash";
import passport from "passport";
import "./setup/auth.js";
import path from "path";
import mainRouter from "./routes/main.js";
import authRouter from "./routes/auth.js";

const app = express();

app.use(express.static("public"));
app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");
app.use(
  session({
    cookie: {
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "strict",
    },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(flash());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

app.use("/", authRouter);
app.use("/", mainRouter);

app.use((err, req, res, next) => {
  if (err) {
    console.error(err);
    res.render("error");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server running at port ${port}`);
});
