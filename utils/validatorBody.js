const { check, validationResult } = require('express-validator');

// Validate fields users
const validatorUser = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a passsword with 6 or more characters',
  ).isLength({ min: 6 }),
];

const validatorLogin = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'password is required').exists(),
];

const validatorProfile = [
  check('status', 'Status is required').not().isEmpty(),
  check('skills', 'Skills is required').not().isEmpty(),
];

// Check if erros in validation
const bodyErros = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
};

module.exports = {
  validatorUser,
  bodyErros,
  validatorLogin,
  validatorProfile,
};
