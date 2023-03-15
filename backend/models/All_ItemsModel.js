const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    // entryNumber: {
    //     type: Number,
    //     required: true
    // },
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    place_found: {
      type: String,
      required: true,
    },
    submited_date: {
      type: String,
      required: true,
    },
    submitedBy_Name: {
      type: String,
      required: true,
    },
    submitedBy_regId: {
      type: String,
      required: true,
    },
    submitedBy_phone: {
      type: String,
      required: true,
    },
    recieved_date: {
      type: String,
      required: true,
    },
    recievedBy_Name: {
      type: String,
      required: true,
    },
    recievedBy_regId: {
      type: String,
      required: true,
    },
    recievedBy_phone: {
      type: String,
      required: true,
    },
    father_phone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('All_Items', itemSchema);
