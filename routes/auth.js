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
  verifyEmail,
} = require("../controllers/auth");

router.post("/signup", signupValidator, validatorResult, signupController);
router.post("/signin", signinValidator, validatorResult, signinController);
router.post("/verify-email", function (req, res) {
  verifyEmail;
});

module.exports = router;
