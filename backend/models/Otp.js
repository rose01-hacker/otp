const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  emailOrPhone: String,
  otp: String,
  createdAt: { type: Date, default: Date.now, expires: 300 }, // expires in 5 mins
});

module.exports = mongoose.model("Otp", otpSchema);
