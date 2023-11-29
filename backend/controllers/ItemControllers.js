const mongoose = require('mongoose');
const fs = require('fs');
const Item = require('../models/ItemModel');

// GET all items
const getItems = async (req, res) => {
  const items = await Item.find({}).sort({ createdAt: -1 });

  res.status(200).json(items);
};

// get a single item
const getItem = async (req, res) => {
  const { id } = req.params;

  const item = await Item.findById(id);

  if (!item) {
    return res.status(404).json({ error: 'No such item' });
  }
  res.status(200).json(item);
};

// create new item
const createItem = async (req, res) => {
  const { _id, name, desc, place, date, submitedBy, regId, phone, imgpath } =
    req.body;

  // add doc to db
  try {
    const item = await Item.create({
      _id,
      name,
      desc,
      imgpath,
      place,
      date,
      submitedBy,
      regId,
      phone,
    });
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a item
const deleteItem = async (req, res) => {
  const { id } = req.params;

  const item = await Item.findOneAndDelete({ _id: id });
  if (!item) {
    return res.id.status(404).json({ error: 'No such item' });
  }

  res.status(200).json(item);
};

// update a item
const updateItem = async (req, res) => {
  const { id } = req.params;
  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.id.status(404).json({ error: 'No such item' });
  // }

  const item = await Item.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!item) {
    return res.status(404).json({ error: 'No such item' });
  }

  res.status(200).json(item);
};

module.exports = {
  createItem,
  getItem,
  getItems,
  deleteItem,
  updateItem,
};
