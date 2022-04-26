const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('its working?????????????????????');
});

router.get('/signup', authController.getSignUp);

router.get('/login', authController.getLogin);

router.post('/signup', authController.postSignUp);

router.post('/login', authController.postLogin);

// router.get('/logout', (req, res) => {});

module.exports = router;
