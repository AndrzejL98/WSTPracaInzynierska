const User = require("../models/User");
const Otp = require("../models/Otp");
const Booking = require("../models/Booking");
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
    welcomemailer(req.body.email);
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
exports.bookingemailSend = async (req, res) => {
  let data = await Booking.findOne({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    datevisit: req.body.datevisit,
    worker: req.body.worker,
    service: req.body.service,
  });
  const responseType = {};
  if (data) {
    responseType.statusText = "Success";
    bookingmailer(
      req.body.name,
      req.body.surname,
      req.body.email,
      req.body.datevisit,
      req.body.worker,
      req.body.service
    );
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
      var salt = bcrypt.genSaltSync(10);
      user.password = req.body.password;
      user.password = await bcrypt.hash(user.password, salt);
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

exports.displayuser = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.send(err).json("error przy wczytywaniu listy userów");
  }
};
exports.displaybooking = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.send(err).json("error przy wczytywaniu listy bookingu");
  }
};
const bookingmailer = (name, surname, email, datevisit, worker, service) => {
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
    subject: "Thank you for your order",
    text: `Your visit has been confirmed.
    Your data:
    name: ${name},
    surname: ${surname},
    email: ${email},
    date:${datevisit}
    worker:${worker},
    service:${service}
    `,
  };

  transporter.sendMail(mailerOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
const welcomemailer = (email) => {
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
    subject: "Welcome",
    text: `Welcome to LegoBarber.pl`,
  };

  transporter.sendMail(mailerOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

exports.sendBookingController = async (req, res) => {
  const { name, surname, email, datevisit, worker, service } = req.body;

  const newVisit = new Booking();
  newVisit.name = name;
  newVisit.surname = surname;
  newVisit.email = email;
  newVisit.datevisit = datevisit;
  newVisit.worker = worker;
  newVisit.service = service;

  try {
    await newVisit.save().then((res) => {});

    res.json({
      successmessage: "Visit booked successfully.Please check your email",
    });

    bookingmailer(
      req.body.name,
      req.body.surname,
      req.body.email,
      req.body.datevisit,
      req.body.worker,
      req.body.service
    );
  } catch (err) {
    console.log("Booking Visit error", err);
    res.status(500).json({
      errorMessage: "Booking Visit error",
    });
  }
};
