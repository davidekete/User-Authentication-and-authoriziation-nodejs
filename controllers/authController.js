const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const helpers = require('../helper');

exports.getSignUp = (req, res) => {
  res.render('signup');
};

exports.getLogin = (req, res) => {
  res.render('login');
};

exports.postSignUp = (req, res) => {
  // eslint-disable-next-line consistent-return
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    }

    const user = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: hash,
    });

    user
      .save()
      .then(() => {
        // eslint-disable-next-line no-underscore-dangle
        const token = helpers.createToken(user.email, user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
        res.status(201).json({
          message: 'User Created',
          user,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          description: helpers.errorHandler(error),
        });
      });
  });
};

exports.postLogin = (req, res) => {
  res.send('new login');
};
