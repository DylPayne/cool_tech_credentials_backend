const mongoose = require('mongoose');

const DivisionSchema = new mongoose.Schema({
  parent: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Division = mongoose.model('division', DivisionSchema);

module.exports = Division;