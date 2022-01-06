const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema(
  {
    email: String,
    code: String,
    expireIn: Number,
  },
  {
    timestamps: true,
  }
);

const Otp = mongoose.model("Otp", OtpSchema);
module.exports = Otp;
