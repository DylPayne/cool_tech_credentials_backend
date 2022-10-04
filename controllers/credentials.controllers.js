const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10; //required by bcrypt
const divisionModel = require('../models/division.schema');
const userModel = require('../models/user.schema');
const credentialModel = require('../models/credential.schema')

// ------------------------------------------------------------
// Creating division
// ------------------------------------------------------------
exports.createDivision = async (req, res) => {
  const {parent, name} = req.body;
  try {
    const division = new divisionModel({
      parent: parent,
      name: name,
    });
    await division.save();
    return res.status(200).json({msg: `Division -${name}- created!`});
  } catch (err) {
    console.log(err);
    return res.status(500).json({err: err});
  }
};

// ------------------------------------------------------------
// Get all divisions
// ------------------------------------------------------------
exports.getDivisions = async (req, res) => {
  console.log('Getting divisions');
  try {
    const divisions = await divisionModel.find({});
    return res.status(200).json(divisions);
  } catch (err) {
    console.log(err);
    return res.status(500).json('Error!');
  }
};

// ------------------------------------------------------------
// Get filtered divisions
// ------------------------------------------------------------
exports.getFilteredDivisions = async (req, res) => {
  console.log('Getting filtered divisions');
  const parent = req.body.parent;
  console.log(req.body);
  try {
    const divisions = await divisionModel.find({parent: parent});
    return res.status(200).json(divisions);
  } catch (err) {
    console.log(err);
    return res.status(500).json('Error!');
  }
};

// ------------------------------------------------------------
// Create credential
// ------------------------------------------------------------
exports.createCredential = async (req, res) => {
  const auth = req.headers['authorization'];
  const token = auth.split(' ')[1];
  const {privateKey} = process.env;
  try {
    if (!token) {
      throw new Error('Authentication failed!');
    }
    const {name, password, site, division} = req.body;
    console.log(req.body);
    const credential = new credentialModel({
      name: name,
      password: password,
      site: site,
      division: division,
    });
    await credential.save();
    return res.status(200).json({msg: 'Credential created!'});

  } catch (err) {
    console.log(err);
    return res.status(500).json({err: 'Server error!'});
  }
}

// ------------------------------------------------------------
// Get filtered credentials
// ------------------------------------------------------------
exports.getFilteredCredentials = async (req, res) => {
  const auth = req.headers['authorization'];
  const token = auth.split(' ')[1];
  const {privateKey} = process.env;
  console.log('Getting filtered credentials');
  const {divisions} = req.body;
  console.log(req.user + '------------------');
  try {
    const decoded = jwt.verify(token, privateKey);
    const role = decoded.role;
    console.log(decoded);
    // const role = decoded.role;
    if (role === 'admin') {
      const credentials = await credentialModel.find()
      console.log(credentials);
      return res.status(200).json(credentials);
    } else {
      const divisions = await userModel.find({name: req.body.name})
      console.log(divisions + '--------------');
      const credentials = await credentialModel.find({division: divisions.division})
      return res.status(200).json(credentials);
    }
    // const credentials = await credentialModel.find({division: divisions});
    // console.log(credentials);
    // return res.status(200).json(credentials);
  } catch (err) {
    console.log(err);
    return res.status(500).json('Error!');
  }
}