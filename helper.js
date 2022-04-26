const jwt = require('jsonwebtoken');

exports.errorHandler = (err) => {
  console.log(err.message, err.code);

  const errors = {
    email: '',
    password: '',
  };

  // duplicate email error
  if (err.code === 11000) { errors.email = 'The email is already in use'; }

  // Validation errors
  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

exports.createToken = (email, id) => jwt.sign({ email, id }, process.env.JWT_KEY, { expiresIn: '24h' });
