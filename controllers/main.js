import { dbGetMessages, dbAddMessage } from "../database/queries.js";
import { validationResult, matchedData } from "express-validator";

async function getMainPage(req, res) {
  if (!req.user) res.redirect("/log-in");
  else {
    const messages = await dbGetMessages();
    const flashMessages = req.flash("errors");
    const errors = flashMessages.length > 0 ? flashMessages[0] : null;
    res.render("main", { user: req.user, messages, errors });
  }
}

async function postMessage(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("errors", errors.mapped());
    res.redirect("/");
    return;
  }

  const { message } = matchedData(req);
  const senderId = req.user.id;
  await dbAddMessage(senderId, message);
  res.redirect("/");
}

export { getMainPage, postMessage };
