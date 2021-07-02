const bcrypt = require('bcryptjs');

const generatePassword = async (pass) => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(String(pass), salt);
  return password;
};

module.exports = {
  generatePassword,
};
