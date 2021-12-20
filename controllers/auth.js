const User = require("../models/User");
const VerificationToken = require("../models/verificationToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { jwtSecret, jwtExpire } = require("../config/keys");
const { sendError } = require("../utils/helper");
const {
  generateOTP,
  mailTransport,
  generateEmailTemplate,
  planingEmailTemplate,
} = require("../utils/mail");
const { isValidObjectId } = require("mongoose");

exports.signupController = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        errorMessage: "Email already exist",
      });
    }

    const newUser = new User();
    newUser.username = username;
    newUser.email = email;

    const OTP = generateOTP();
    const verificationToken = new VerificationToken({
      owner: newUser._id,
      token: OTP,
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await verificationToken.save();
    await newUser.save();

    mailTransport().sendMail({
      from: "emailverification@email.com",
      to: newUser.email,
      subject: "Verify your account",
      html: generateEmailTemplate(OTP),
    });

    res.json({
      successMessage: "Registration success. Please signin",
    });
  } catch (err) {
    console.log("signupController error", err);
    res.status(500).json({
      errorMessage: "Server error",
    });
  }
};
exports.signinController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        errorMessage: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        errorMessage: "Invalid credentials",
      });
    }

    exports.verifyEmail = async (req, res) => {
      const { userId, otp } = req.body;
      if (!userId || !otp.trim())
        return sendError(res, "Invalid request, missing parameters!");

      if (isValidObjectId(userId)) return sendError(res, "Invalid user id!");

      const user = await User.findById(userId);
      if (!user) return sendError(res, "User not found");

      if (user.verified)
        return sendError(res, "This account is already verified");

      const token = await VerificationToken.findOne({ owner: user._id });
      if (!token) return sendError(res, "User not found");

      const isMatched = await token.compareToken(otp);
      if (!isMatched) return sendError(res, "Please provide a valid token");

      user.verified = true;
      await VerificationToken.findByIdAndDelete(token._id);
      await user.save();

      mailTransport().sendMail({
        from: "emailverification@email.com",
        to: user.email,
        subject: "Welcome Email",
        html: planingEmailTemplate(
          "Email Verified Successfully",
          "Thanks for connecting with us"
        ),
      });

      res.json({
        success: true,
        message: "your email is verified.",
        user: { name: user.name, email: user.email, id: user.id },
      });
    };

    //prep payload

    const payload = {
      user: {
        _id: user._id,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: jwtExpire }, (err, token) => {
      if (err) {
        console.log("jwt error: ", err);
      }
      const { _id, username, email, role } = user;

      res.json({
        token,
        user: { _id, username, email, role },
      });
    });
  } catch (err) {
    console.log("signinController err:", err);
    res.status(500).json({
      errorMessage: "Server error",
    });
  }
};
