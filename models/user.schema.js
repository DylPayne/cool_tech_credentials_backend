const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'normal',
  },
  ou: {
    type: Array,
    required: true,
    default: [],
  },
  division: {
    type: Array,
    required: true,
    default: [],
  },
});

const Job = mongoose.model('user', UserSchema);

module.exports = Job;
