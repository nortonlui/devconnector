const moongose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

// Options config mongo
const optionDB = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

const connectDB = async () => {
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
