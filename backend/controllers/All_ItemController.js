const mongoose = require('mongoose');
const Item = require('../models/All_ItemsModel');

// GET all items
const get_AllItems = async (req, res) => {
  const items = await Item.find({}).sort({ createdAt: -1 });

  res.status(200).json(items);
};

// get a single item
const get_AllItem = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such item' });
  }
  const item = await Item.findById(id);

  if (!item) {
    return res.status(404).json({ error: 'No such item' });
  }
  res.status(200).json(item);
};

// create new item
const create_AllItem = async (req, res) => {
  const {
    name,
    desc,
    place_found,
    submited_date,
    submitedBy_Name,
    submitedBy_regId,
    submitedBy_phone,
    recieved_date,
    recievedBy_Name,
    recievedBy_regId,
    recievedBy_phone,
    father_phone,
  } = req.body;

  let emptyFields = [];

  // if (!name) {
  //   emptyFields.push('name');
  // }
  // if (!desc) {
  //   emptyFields.push('desc');
  // }
  // if (!place_found) {
  //   emptyFields.push('place_found');
  // }
  // if (!submited_date) {
  //   emptyFields.push('submited_date');
  // }
  // if (!submitedBy_Name) {
  //   emptyFields.push('submitedBy_Name');
  // }
  // if (!submitedBy_regId) {
  //   emptyFields.push('submitedBy_regId');
  // }
  // if (!submitedBy_phone) {
  //   emptyFields.push('submitedBy_phone');
  // }
  if (!recievedBy_Name) {
    emptyFields.push('recievedBy_Name');
  }
  if (!recieved_date) {
    emptyFields.push('recieved_date');
  }
  if (!recievedBy_regId) {
    emptyFields.push('recievedBy_regId');
  }
  if (!recievedBy_phone) {
    emptyFields.push('recievedBy_phone');
  }
  if (!father_phone) {
    emptyFields.push('father_phone');
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all the Fields', emptyFields });
  }

  // add doc to db
  try {
    const item = await Item.create({
      name,
      desc,
      place_found,
      submited_date,
      submitedBy_Name,
      submitedBy_regId,
      submitedBy_phone,
      recieved_date,
      recievedBy_Name,
      recievedBy_regId,
      recievedBy_phone,
      father_phone,
    });
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a item
const delete_AllItem = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.id.status(404).json({ error: 'No such item' });
  }

  const item = await Item.findOneAndDelete({ _id: id });
  if (!item) {
    return res.id.status(404).json({ error: 'No such item' });
  }

  res.status(200).json(item);
};

// update a item
const update_AllItem = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.id.status(404).json({ error: 'No such item' });
  }

  const item = await Item.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!item) {
    return res.id.status(404).json({ error: 'No such item' });
  }

  res.status(200).json(item);
};

module.exports = {
  create_AllItem,
  get_AllItem,
  get_AllItems,
  delete_AllItem,
  update_AllItem,
};
