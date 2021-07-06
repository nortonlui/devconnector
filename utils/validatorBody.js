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

// Validate fields login
const validatorLogin = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'password is required').exists(),
];

// Validate fields profile
const validatorProfile = [
  check('status', 'Status is required').not().isEmpty(),
  check('skills', 'Skills is required').not().isEmpty(),
];

// Validate fields experience
const validatorExperience = [
  check('title', 'Title is required').not().isEmpty(),
  check('company', 'Company is required').not().isEmpty(),
  check('from', 'From date is required').not().isEmpty(),
];

// Validate fields education
const validatorEducation = [
  check('school', 'School is required').not().isEmpty(),
  check('degree', 'Degree is required').not().isEmpty(),
  check('fieldofstudy', 'Field of study is required').not().isEmpty(),
  check('from', 'From date is required').not().isEmpty(),
];

// Validate fields post
const validatorPost = [check('text', 'Text is required').not().isEmpty()];

// Validate fields comment
const validatorComment = [check('text', 'Text is required').not().isEmpty()];

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
  validatorExperience,
  validatorEducation,
  validatorPost,
  validatorComment,
};
