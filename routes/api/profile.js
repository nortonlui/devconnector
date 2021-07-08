const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Validator = require('../../utils/validatorBody');
const { existBodyField } = require('../../utils/existBodyField');
const Git = require('../../utils/githubUserInfo');
const Post = require('../../models/Post');

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
    return res.status(500).send('Server error');
  }
});

// @route    GET    api/profile
// @desc     Get all profile
// @access    Public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET    api/profile/user/:user_id
// @desc     Get profile by user ID
// @access    Public

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);
    if (!profile) res.status(404).json({ msg: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      res.status(404).json({ msg: 'Profile not found' });
    } else {
      res.status(500).send('Server error');
    }
  }
});

// @route    DELETE   api/profile
// @desc     delete profile, user  & post
// @access    Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove users posts
    await Post.deleteMany({ user: req.user.id });
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'User and profile deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    PUT   api/profile/experience
// @desc     Add profile experience
// @access    Private
router.put(
  '/experience',
  [auth, Validator.validatorExperience],
  async (req, res) => {
    Validator.bodyErros(req, res);
    const { title, company, location, from, to, current, description } =
      req.body;
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  },
);

// @route    DELETE   api/profile/experience/:exp_id
// @desc     delete profile experience
// @access    Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    // Get remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route    PUT   api/profile/education
// @desc     Add profile education
// @access    Private
router.put(
  '/education',
  [auth, Validator.validatorEducation],
  async (req, res) => {
    Validator.bodyErros(req, res);
    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body;
    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  },
);

// @route    DELETE   api/profile/education/:edu_id
// @desc     delete profile education
// @access    Private
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    // Get remove index
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route    GET  api/profile/github/:username
// @desc     Get user repos from github
// @access    Public

router.get('/github/:username', (req, res) => {
  Git.githubUserInfo(req.params.username, res);
});

module.exports = router;
