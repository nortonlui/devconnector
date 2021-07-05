const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Validator = require('../../utils/validatorBody');
const { existBodyField } = require('../../utils/existBodyField');

// @route    GET    api/profile/me
// @desc     Get current users profile
// @access    Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar'],
    );
    if (!profile) {
      return res.status(400).json({ mgs: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@route    POST    api/profile
//@desc     Get Create or update user profile
//@access    Private
router.post('/', [auth, Validator.validatorProfile], async (req, res) => {
  Validator.bodyErros(req, res);

  // Build profile object
  const profileFields = existBodyField(req.user.id, req.body);
  //console.log(profileFields);
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      // Update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true },
      );
      return res.json(profile);
    }
    // Create
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
