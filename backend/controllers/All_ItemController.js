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
  try {
    const itemDetails = req.body; // Assuming the data is sent in the request body
    const newItem = new Item(itemDetails);
    await newItem.save();
    res.status(201).json({ message: 'Item added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// delete a item
const delete_AllItem = async (req, res) => {
  const { id } = req.params;

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
