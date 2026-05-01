import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { dbGetUserByEmail, dbGetUserByID } from "../database/queries.js";

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await dbGetUserByEmail(email);
        if (!user) return done(null, false, { message: "0: Incorrect Email" });
        const isMatched = await bcrypt.compare(password, user.password);

        if (!isMatched)
          return done(null, false, { message: "1: Incorrect Password" });

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await dbGetUserByID(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
