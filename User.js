// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  // add other fields as needed
});

module.exports = mongoose.model('User', UserSchema);
