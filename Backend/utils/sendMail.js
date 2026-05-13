const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async (to, subject, html) => {
  try {
    console.log("sendMail function started...");
    console.log("Sending mail to:", to);
    console.log("Sender Email:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log("Transporter created successfully");

    const info = await transporter.sendMail({
      from: `"Event Management" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("Mail sent successfully");
    console.log("Mail response:", info.response);

    return info;
  } catch (error) {
    console.log("Email error full:", error);
    console.log("Email error message:", error.message);
  }
};

module.exports = sendMail;