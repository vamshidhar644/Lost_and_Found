const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    imgpath: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    submitedBy: {
      type: String,
      required: true,
    },
    regId: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    requests: {
      type: [String], // Assuming req_id is of type String, modify accordingly
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Items', itemSchema);
