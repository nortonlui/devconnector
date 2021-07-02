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
};
