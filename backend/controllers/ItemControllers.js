const mongoose = require('mongoose');
const Item = require('../models/ItemModel');

// GET all items
const getItems = async (req, res) => {
  const user_id = req.user._id
  const items = await Item.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(items);
};

// get a single item
const getItem = async (req, res) => {
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
const createItem = async (req, res) => {
  const { title, load, reps } = req.body;

  let emptyFields = []

  if(!title){
    emptyFields.push('title')
  }
  if(!load){
    emptyFields.push('load')
  }
  if(!reps){
    emptyFields.push('reps')
  }
  if(emptyFields.length > 0){
    return res.status(400).json({ error: 'Please fill in all the Fields', emptyFields})
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const item = await Item.create({ title, load, reps, user_id });
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a item
const deleteItem = async (req, res) => {
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
const updateItem = async (req, res) => {
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
  createItem,
  getItem,
  getItems,
  deleteItem,
  updateItem
};
