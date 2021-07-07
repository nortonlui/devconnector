const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Validator = require('../../utils/validatorBody');
const { sign } = require('../../utils/jwt.js');
const { checkPassword } = require('../../utils/hashPassword');
const config = require('config');

// @route    GET    api/auth
// @desc     Test if Authenticated user
// @acess    Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.log(err);
    res.status(500).send('Server error');
  }
});

// @route    POST    api/auth
// @desc     Authenticated user & get token
// @acess    Public

router.post('/', Validator.validatorLogin, async (req, res) => {
  Validator.bodyErros(req, res);

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    const isMatch = await checkPassword(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    // Create token to user using your id
    //const token = JSON.stringify(sign(payload));
    const token = sign(payload);

    // Send token to user
    return res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
