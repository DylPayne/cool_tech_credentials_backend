const express = require('express');
const {
  createDivision,
  getDivisions,
  getFilteredDivisions,
  createCredential,
  getFilteredCredentials
} = require('../controllers/credentials.controllers');

const app = express();

// ------------------------------------------------------------
// Create division
// ------------------------------------------------------------
app.post('/division/add', createDivision);

// ------------------------------------------------------------
// Get all divisions
// ------------------------------------------------------------
app.get('/division/get/all', getDivisions);

// ------------------------------------------------------------
// Get filtered divisions
// ------------------------------------------------------------
app.post('/division/get', getFilteredDivisions);

// ------------------------------------------------------------
// Create credential
// ------------------------------------------------------------
app.post('/credential/add', createCredential)

// ------------------------------------------------------------
// Get credentials
// ------------------------------------------------------------
app.post('/credentials/get', getFilteredCredentials)


module.exports = app;
