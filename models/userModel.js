const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'fullname is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please Enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    validate: [function (val) {
      return val.length === 6;
    }, 'Password must have at least 6 characters'],
  },
});

module.exports = mongoose.model('User', userSchema);
