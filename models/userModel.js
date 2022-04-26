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
    required: [true, 'Email is required'],
    minlength: [6, 'Password Must be at least 6 characters'],
  },
});

module.exports = mongoose.model('User', userSchema);
