const express = require("express");
const User = require("../models/User");
const router = express.Router();
const {
  signupValidator,
  signinValidator,
  validatorResult,
} = require("../middleware/validator");
const {
  signupController,
  signinController,
  emailSend,
  changePassword,
  sendBookingController,
} = require("../controllers/auth");

router.post("/signup", signupValidator, validatorResult, signupController);

router.post("/email-send", emailSend);
router.post("/signin", signinValidator, validatorResult, signinController);
router.post("/change-password", changePassword);
router.post("/bookingvisit", sendBookingController);
router.route("/displayuser").get((req, res) => {
  User.find({ username: req.body.username })
    .then((users) => res.json(users))
    .catch((err) => {
      res.status(400).json("Error:" + err);
    });
});

module.exports = router;
