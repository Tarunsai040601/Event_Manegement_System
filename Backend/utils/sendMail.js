const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (to, subject, html) => {
  try {
    const msg = {
      to,
      from:"tarunsai04062002@gmail.com",
      subject,
      html,
    };

    await sgMail.send(msg);
    console.log("Mail sent successfully");
  } catch (error) {
    console.log("SendGrid error:", error.message);
  }
};

module.exports = sendMail;