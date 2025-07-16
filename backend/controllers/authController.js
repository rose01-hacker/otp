const User = require("../models/User");
const Otp = require("../models/Otp");
const { sendOTP } = require("../services/otpManger");
const { sendEmail } = require("../services/emailService");
const { sendSMS } = require("../services/smsService");
const { generateToken } = require("../services/tokenService");

exports.requestOtp = async (req, res) => {
  const { emailOrPhone } = req.body;
  if (!emailOrPhone)
    return res.status(400).json({ msg: "Provide email or phone" });

  const otp = await sendOTP(emailOrPhone);
  if (emailOrPhone.includes("@")) await sendEmail(emailOrPhone, otp);
  else await sendSMS(emailOrPhone, otp);

  return res.status(200).json({ msg: "OTP sent 🚀" });
};

exports.verifyOtp = async (req, res) => {
  const { emailOrPhone, otp } = req.body;
  const valid = await Otp.findOne({ emailOrPhone, otp });

  if (!valid) return res.status(400).json({ msg: "Invalid OTP" });

  let user = await User.findOne({ emailOrPhone });
  if (!user) user = await User.create({ emailOrPhone });

  await Otp.deleteMany({ emailOrPhone }); // one-time use

  const token = generateToken(user._id);
  return res.status(200).json({ token });
};
