const bcrypt = require('bcryptjs');

const generatePassword = async (pass) => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(String(pass), salt);
  return password;
};

const checkPassword = async (pass, encryptPass) => {
  const isMatch = await bcrypt.compare(String(pass), encryptPass);
  return isMatch;
};

module.exports = {
  generatePassword,
  checkPassword,
};
