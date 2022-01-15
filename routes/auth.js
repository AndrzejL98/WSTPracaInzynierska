const express = require("express");
//const User = require("../models/User");
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
  displayuser,
  displaybooking,
  //sendlocalmail,
  displayuserpaneluser,
  displayuserpanelorder,
} = require("../controllers/auth");

router.post("/signup", signupValidator, validatorResult, signupController);

router.post("/email-send", emailSend);
router.post("/signin", signinValidator, validatorResult, signinController);
router.post("/change-password", changePassword);
router.post("/bookingvisit", sendBookingController);
//router.post("/sendlocalmail", sendlocalmail);
// router.get("/sendlocalmail", sendlocalmail);
router.get("/displayuser", displayuser);
router.post("/displayuserpaneluser", displayuserpaneluser);
router.post("/displayuserpanelorder", displayuserpanelorder);
router.get("/displaybooking", displaybooking);

module.exports = router;
