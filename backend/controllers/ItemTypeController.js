const mongoose = require('mongoose');
const ItemType = require('../models/ItemTypeModel');

// GET all items
const getItemTypes = async (req, res) => {
  const items = await ItemType.find({}).sort({ createdAt: -1 });

  res.status(200).json(items);
};

// get a single item
const getItemType = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such item type' });
  }
  const item = await ItemType.findById(id);

  if (!item) {
    return res.status(404).json({ error: 'No such item type' });
  }
  res.status(200).json(item);
};

// create new item
const createItemType = async (req, res) => {
  const { itemType } = req.body;

  let emptyFields = [];

  if (!itemType) {
    emptyFields.push('itemType');
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all the Fields', emptyFields });
  }

  // add doc to db
  try {
    const item = await ItemType.create({
      itemType,
    });
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a item
const deleteItemType = async (req, res) => {
  const { id } = req.params;

  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.id.status(404).json({ error: 'No such item' });
  // }

  const item = await ItemType.findOneAndDelete({ _id: id });
  if (!item) {
    return res.id.status(404).json({ error: 'No such item type' });
  }

  res.status(200).json(item);
};

// update a item
const updateItemType = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.id.status(404).json({ error: 'No such item type' });
  }

  const item = await ItemType.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!item) {
    return res.id.status(404).json({ error: 'No such item type' });
  }

  res.status(200).json(item);
};

module.exports = {
  createItemType,
  getItemType,
  getItemTypes,
  deleteItemType,
  updateItemType,
};
