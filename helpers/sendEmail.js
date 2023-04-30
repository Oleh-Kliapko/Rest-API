const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { BASE_URL } = process.env;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (email, verificationToken) => {
  const newEmail = {
    to: email,
    subject: "Verify your email, please",
    html: `<h3>You want to sign in?</h3><a style="font-size:16px" target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click this to verify your email</a>`,
    from: "goldclub1977@gmail.com",
  };

  await sgMail.send(newEmail);

  return true;
};

module.exports = sendEmail;
