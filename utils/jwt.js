const jwt = require('jsonwebtoken');
const config = require('config');

const optionsToken = {
  expiresIn: 360000,
};

const sign = (payload) => {
  try {
    const key = jwt.sign(payload, config.get('jwtSecret'), optionsToken);
    return key;
  } catch (err) {
    console.log(err);
  }
};

const verify = (token) => {
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    return decoded.user;
  } catch (err) {
    //console.log(err);
    return 'token_error';
  }
};

module.exports = {
  sign,
  verify,
};
