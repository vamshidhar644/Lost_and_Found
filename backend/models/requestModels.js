const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requestSchema = new Schema({
  req_id: {
    type: String,
    required: true,
    unique: true,
  },
  req_date: {
    type: String,
    required: true,
  },
  item_id: {
    type: String,
    required: true,
  },
  req_email: {
    type: String,
    required: true,
  },
  regNo_empId: {
    type: String,
    required: true,
  },
  req_name: {
    type: String,
    required: true,
  },
  lost_date: {
    type: String,
    required: true,
  },
  req_desc: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('requests', requestSchema);
