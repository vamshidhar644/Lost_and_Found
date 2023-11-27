const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  regNo: {
    type: String,
    required: true,
  },
  requests: {
    type: [String], // Assuming req_id is of type String, modify accordingly
    default: [],
  },
});

module.exports = mongoose.model('User', userSchema);
