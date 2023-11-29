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

  const item = await ItemType.findById(id);

  if (!item) {
    return res.status(404).json({ error: 'No such item type' });
  }
  res.status(200).json(item);
};

// create new item
const createItemType = async (req, res) => {
  try {
    const { itemType } = req.body;

    const newItem = ItemType.create({ itemType });

    res.status(200).json({ message: 'Item type added' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a item
const deleteItemType = async (req, res) => {
  const { id } = req.params;

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
