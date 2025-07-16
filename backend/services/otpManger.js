const Otp = require("../models/Otp");

exports.sendOTP = async (emailOrPhone) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await Otp.create({ emailOrPhone, otp });
  return otp;
};
