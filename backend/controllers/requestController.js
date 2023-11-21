const mongoose = require('mongoose');
const Requests = require('../models/requestModels');
const Items = require('../models/ItemModel');
const Users = require('../models/userModel');

// GET all requests
const getRequests = async (req, res) => {
  const requests = await Requests.find({}).sort({ createdAt: -1 });

  res.status(200).json(requests);
};

// get a single request
const getRequest = async (req, res) => {
  const { id } = req.params;

  const request = await Requests.findOne({ req_id: id });

  if (!request) {
    return res.status(404).json({ error: 'No such request' });
  }
  res.status(200).json(request);
};

// create new request
const createRequest = async (req, res) => {
  const {
    req_id,
    req_date,
    item_id,
    req_email,
    regNo_empId,
    req_name,
    lost_date,
    req_desc,
    image,
  } = req.body;

  const status = 'pending';

  try {
    const item = await Items.findOne({ _id: item_id });

    if (!item) {
      res.status(404).json({ error: 'Item not exists' });
      return;
    }

    const request = await Requests.create({
      req_id,
      req_date,
      item_id,
      req_email,
      regNo_empId,
      req_name,
      lost_date,
      req_desc,
      image,
      status,
    });

    // Update "items" collection with the req_id
    await Items.updateOne({ _id: item_id }, { $push: { requests: req_id } });

    res.status(200).json(request);
  } catch (error) {
    console.error('Error adding request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// delete a request
const deleteRequest = async (req, res) => {
  const { id } = req.params;

  const request = await Requests.findOneAndDelete({ _id: id });
  if (!request) {
    return res.id.status(404).json({ error: 'No such request' });
  }

  res.status(200).json(request);
};

// update a request
const updateRequest = async (req, res) => {
  const { id } = req.params;

  const request = await Requests.findOneAndUpdate(
    { req_id: id },
    { ...req.body }
  );

  if (!request) {
    return res.id.status(404).json({ error: 'No such request' });
  }

  res.status(200).json(request);
};

module.exports = {
  createRequest,
  getRequest,
  getRequests,
  deleteRequest,
  updateRequest,
};
