const mongoose = require('mongoose')

const CredentialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  site: {
    type: String,
    required: true,
  },
  division: {
    type: String,
    required: true,
  },
})

const Credential = mongoose.model( 'credential', CredentialSchema )

module.exports = Credential;