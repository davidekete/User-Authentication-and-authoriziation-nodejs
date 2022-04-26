const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');

const app = express();

// set view engine
app.set('view engine', 'ejs');

// middleware
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// handling CORS error
app.use(cors());

// env variables
const port = process.env.PORT || 5000;
const dburi = process.env.DB_URI;

// connecting to db
mongoose.connect(dburi).then(() => {
  console.log('connected to db');
});

app.listen(port, () => {
  console.log('port up and running');
});

app.use(authRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res) => {
  res.status(error.status || 500).json({ error: error.message });
});

module.exports = app;
