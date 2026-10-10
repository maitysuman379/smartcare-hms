const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendOtpEmail(to, otp) {
  await transporter.sendMail({
    from: `"SmartCare HMS" <${process.env.SMTP_USER}>`,
    to,
    subject: "Your SmartCare HMS verification code",
    text: `Your verification code is ${otp}. It expires in 10 minutes. If you did not request this, you can ignore this email.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 420px; margin: auto;">
        <h2 style="color: #0F5257;">SmartCare HMS</h2>
        <p>Use this code to verify your email:</p>
        <p style="font-size: 32px; font-weight: bold; letter-spacing: 6px;">${otp}</p>
        <p style="color: #666;">This code expires in 10 minutes. If you did not request it, ignore this email.</p>
      </div>
    `,
  });
}

module.exports = { sendOtpEmail };
