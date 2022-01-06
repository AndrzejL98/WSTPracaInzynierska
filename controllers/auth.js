const User = require("../models/User");
const Otp = require("../models/Otp");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpire } = require("../config/keys");
require("dotenv").config();

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

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save().then((result) => {});
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
    } else {
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
    }
  } catch (err) {
    console.log("signinController err:", err);
    res.status(500).json({
      errorMessage: "Server error",
    });
  }
};

exports.emailSend = async (req, res) => {
  let data = await User.findOne({ email: req.body.email });
  const responseType = {};
  if (data) {
    let otpcode = Math.floor(Math.random() * 10000 + 1);
    let otpData = new Otp({
      email: req.body.email,
      code: otpcode,
      expireIn: new Date().getTime() + 300 * 1000,
    });
    let otpResponse = await otpData.save();
    responseType.statusText = "Success";
    mailer(req.body.email, otpcode);
    responseType.message = "Please Check Your Email Id";
  } else {
    responseType.statusText = "Error";
    responseType.message = "Email Id not Exists";
  }
  res.status(200).json(responseType);
};

exports.changePassword = async (req, res) => {
  let data = await Otp.find({ email: req.body.email, code: req.body.otpCode });
  const response = {};
  if (data) {
    let currentTime = new Date().getTime();
    let diff = data.expireIn - currentTime;
    if (diff < 0) {
      response.message = "Token Expire";
      response.statusText = "error";
    } else {
      let user = await User.findOne({ email: req.body.email });
      user.password = req.body.password;
      user.save();
      response.message = "Password Changes Successfuly";
      response.statusText = "Success";
    }
  } else {
    response.message = "Invalid Otp";
    response.statusText = "error";
  }
  res.status(200).json(response);
};

const mailer = (email, otp) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASS,
    },
  });

  var mailerOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "OTP",
    text: `Your OTP: ${otp}`,
  };

  transporter.sendMail(mailerOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
