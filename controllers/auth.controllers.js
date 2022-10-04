const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10; //required by bcrypt
const userModel = require('../models/user.schema');

// ------------------------------------------------------------
// Creating user
// ------------------------------------------------------------
exports.createUser = async (req, res) => {
  const auth = req.headers['authorization'];
  const token = auth.split(' ')[1];
  const { privateKey } = process.env;
  try {
    const decoded = jwt.verify(token, privateKey);
    console.log(decoded);
    if (decoded.role != 'admin') {
      throw new Error('Insufficient permissions!');
    }
    const { name, password, role, ou, division } = req.body;
    console.log(req.body);
    let hash = await bcrypt.hash(password, saltRounds);
    if (!token) {
      throw new Error('Authentication failed!');
    }
    if (typeof hash !== 'undefined') {
      const user = new userModel({
        username: name,
        passwordHash: hash,
        role: role,
        ou: ou,
        division: division,
      });
      await user.save();
      return res.status(200).json({ msg: 'User created!' });
    }
    return res.status(500).json({ err: 'Server error!' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: 'Server error!' });
  }
};

// ------------------------------------------------------------
// Logging in
// ------------------------------------------------------------
exports.login = async (req, res) => {
  try {
    console.log(req.body);
    const { name, password } = req.body;
    var token = 'null';
    if (name && password) {
      const { username, passwordHash, role } = await userModel.findOne({
        username: name,
      });
      const { privateKey } = process.env;
      let match = await bcrypt.compare(password, passwordHash);
      if (username === name && match) {
        token = await jwt.sign({ username: username, role: role }, privateKey, {
          expiresIn: '1h',
        });
      }
      if (token) {
        return res.status(200).json({ token: token, role: role, name: name });
      }
      console.log('No match');
      return res.status(401).json({ err: 'Incorrect login!' });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json('Error!');
  }
};

// ------------------------------------------------------------
// Verifying token
// ------------------------------------------------------------
exports.verifyToken = async (req, res, next) => {
  req.user = { username: null, verified: false };
  const { privateKey } = process.env;
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    jwt.verify(bearerToken, privateKey, (err, data) => {
      if (!(err && typeof data === 'undefined')) {
        req.user = { username: data.username, verified: true };
        next();
      }
    });
  }
  return res.status(403).json({ err: 'Bad JWT!' });
};

// ------------------------------------------------------------
// Logging out
// ------------------------------------------------------------
exports.logout = async (req, res) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
  }
  return res.status(200).json({ msg: 'Logged out!' });
};

// ------------------------------------------------------------
// Getting users
// ------------------------------------------------------------
exports.getUsers = async (req, res) => {
  console.log('Getting users');
  try {
    const users = await userModel.find({});
    console.log(users);
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json('Error!');
  }
};

// ------------------------------------------------------------
// Delete user
// ------------------------------------------------------------
exports.deleteUser = async (req, res) => {
  const { id } = req.body;
  console.log('Deleting user...');
  userModel.findByIdAndDelete(id)
    .then(() => console.log('User deleted'))
    .catch((err) => console.log(err));
}