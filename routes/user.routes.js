const express = require('express');
const userModel = require('../models/user.schema');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10; //required by bcrypt
const {
  createUser,
  login,
  logout,
  getUsers,
  deleteUser
} = require('../controllers/auth.controllers');

// ------------------------------------------------------------
// Create user
// ------------------------------------------------------------
app.post('/user/add', createUser);

// ------------------------------------------------------------
// Logging in
// ------------------------------------------------------------
app.post('/user/login', login);

// ------------------------------------------------------------
// Logging out
// ------------------------------------------------------------
app.get('/user/logout', logout);

// ------------------------------------------------------------
// Get users
// ------------------------------------------------------------
app.get('/users/get', getUsers);

// ------------------------------------------------------------
// Delete user
// ------------------------------------------------------------
app.post('/user/delete', deleteUser);

module.exports = app;
