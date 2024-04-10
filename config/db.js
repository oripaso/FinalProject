const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('your_database_url', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
