const gravatar = require('gravatar');

const profile = (email) => {
  return gravatar.url(email, {
    s: '200',
    r: 'pg',
    d: 'mm',
  });
};

module.exports = {
  profile,
};
