import { dbGetMessages, dbAddMessage } from "../database/queries.js";
import { validationResult, matchedData } from "express-validator";

async function getMainPage(req, res) {
  const messages = await dbGetMessages();
  const flashMessages = req.flash("errors");
  const errors = flashMessages.length > 0 ? flashMessages[0] : null;
  res.render("main", { user: req.user, messages, errors });
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

async function logOut(req, res) {
  req.logOut(() => {
    req.session.destroy();
    res.clearCookie("connect.sid");
    res.redirect("/log-in");
  });
}
export { getMainPage, postMessage, logOut };
