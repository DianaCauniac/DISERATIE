const { check, validationResult } = require("express-validator");

exports.validateSignupRequest = [
  check("email").isEmail().withMessage("Emailul nu este corect"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

exports.validateSigninRequest = [
  check("email").isEmail().withMessage("Emailul nu este corect"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Parola trebuie sa aiba cel putin 6 caractere"),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(200).json({ error: errors.array()[0].msg });
  }
  next();
};
