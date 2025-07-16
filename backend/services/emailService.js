exports.sendEmail = async (email, otp) => {
  console.log(`📧 Email sent to ${email}: Your OTP is ${otp}`);
  // Integrate nodemailer or Mailgun here
};
