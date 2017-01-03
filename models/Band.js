const mongoose = require('mongoose');

const bandSchema = new mongoose.Schema({
  name: String,
  rank: Number,
  country: String
});

const Band = mongoose.model('Band', bandSchema);

module.exports = Band;
