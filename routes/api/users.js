const express = require('express');
const router = express.Router();
const { generatePassword } = require('../../utils/hashPassword');
const Validator = require('../../utils/validatorBody');
const { profile } = require('../../utils/avatar');
const { sign } = require('../../utils/jwt.js');
const User = require('../../models/User');

// @route    POST    api/users
// @desc     Register a user
// @acess    Public

router.post('/', Validator.validatorUser, async (req, res) => {
  Validator.bodyErros(req, res);

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    // generate avatar
    const avatar = profile(email);

    user = new User({
      name,
      email,
      avatar,
      password,
    });

    // Generate user hash password
    user.password = await generatePassword(password);

    const payload = {
      user: {
        id: user.id,
      },
    };

    // Create token to user using your id
    const token = JSON.stringify(sign(payload));

    // Save user in db
    await user.save();

    // Send information about user registration
    res.send('User registered');
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }

  // Flow user registration
  // See if user exists
  // Get users gravatar
  // Encrypt password
  // Return jsonwebtoken
});

module.exports = router;
