const express = require("express");
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
} = require("../controllers/auth");

router.post("/signup", signupValidator, validatorResult, signupController);

router.post("/email-send", emailSend);
router.post("/signin", signinValidator, validatorResult, signinController);
router.post("/change-password", changePassword);

module.exports = router;
