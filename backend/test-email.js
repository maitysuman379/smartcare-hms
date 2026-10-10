require("dotenv").config();
const { sendOtpEmail } = require("./src/services/emailService");

sendOtpEmail("maitysuman379@gmail.com", "123456")
  .then(() => console.log("Email sent"))
  .catch((err) => console.error("Failed:", err.message));
