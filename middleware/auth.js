const { verify } = require('../utils/jwt');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorized denied' });
  }

  // Verify token
  req.user = verify(token);

  // Check error in token
  if (req.user === 'token_error') {
    return res.status(401).json({ msg: 'token invalid' });
  }
  next();
};
