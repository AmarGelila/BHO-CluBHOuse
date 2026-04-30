import mailTransporter from "../setup/mail.js";
import { dbUpdateMembership } from "../database/queries.js";
import ejs from "ejs";
import path from "path";

async function postBeMember(req, res) {
  const user = req.user;
  const code = Math.floor(Math.random() * 90000 + 10000);
  const now = new Date().getTime();

  const html = await ejs.renderFile(
    path.join(import.meta.dirname, "../views/snippets/email.ejs"),
    {
      fullname: user.fullname,
      code,
    },
  );
  req.session.verificationCode = { value: code, sentAt: now };
  const mailOptions = {
    to: user.email,
    html,
    from: "BHO cluBHOuse",
    subject: "BHO Clubhouse Private Membership",
  };
  await mailTransporter.sendMail(mailOptions);

  res.render("be-member", { user: req.user, disableSend: true });
}

async function postBeMemberVerify(req, res) {
  const userCode = req.body.code;
  const code = req.session.verificationCode;
  const now = new Date().getTime();

  if (now - code.sentAt > 600000) {
    delete req.session.verificationCode;
    res.render("be-member", {
      user: req.user,
      message:
        "This code has expired , click the button below to get another one.",
    });
    return;
  }

  if (+userCode !== code.value) {
    res.render("be-member", {
      user: req.user,
      message: "The code is wrong",
      disableSend: true,
    });
    return;
  }

  await dbUpdateMembership(req.user.id);
  delete req.session.verificationCode;
  res.render("confirm", {
    title: "Membership accepted",
    message: `You a now a BHOian ${req.user.fullname} click the button below to go to the main page.`,
    link: "/",
    linkText: "Home",
  });
}

export { postBeMember, postBeMemberVerify };
