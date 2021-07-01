const moongose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  const optionDB = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    await moongose.connect(db, optionDB);
    console.log('MongoDB Connect...');
  } catch (err) {
    console.log(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
