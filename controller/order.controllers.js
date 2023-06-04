const mongoose = require('mongoose');
const Order = require('../models/order.model');
const { database } = require('./mongodb.controller');
const ObjectId = require('mongodb').ObjectId;

exports.getOrders = async (req, res, next) => {
  const { limit, skip, ...filter } = req.query;

  const options = {
    db: 'theautomobiles',
    table: 'orders',
    method: 'find',
    data: {
      find: { ...filter },
      limit: parseInt(limit),
      skip: parseInt(skip),
    },
  };

  const data = await database(options);
  res.status(200).send(data);
};

exports.postOrder = async (req, res, next) => {
  const data = req.body;

  const order = new Order({
    payment_method: 'bacs',
    payment_method_title: 'Direct Bank Transfer',
    set_paid: true,
    billing: {
      first_name: 'John',
      last_name: 'Doe',
      address_1: '969 Market',
      address_2: '',
      city: 'San Francisco',
      state: 'CA',
      postcode: '94103',
      country: 'US',
      email: 'john.doe@example.com',
      phone: '(555) 555-5555',
    },
    shipping: {
      first_name: 'John',
      last_name: 'Doe',
      address_1: '969 Market',
      address_2: '',
      city: 'San Francisco',
      state: 'CA',
      postcode: '94103',
      country: 'US',
    },
    line_items: [
      {
        product_id: 93,
        quantity: 2,
      },
      {
        product_id: 22,
        variation_id: 23,
        quantity: 1,
      },
    ],
    shipping_lines: [
      {
        method_id: 'flat_rate',
        method_title: 'Flat Rate',
        total: '10.00',
      },
    ],
  });
  order.save().then(() => res.json({ id: order.id, message: 'Successfully saved!' }));
};

/**
 * Get Single order
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getSingleOrder = async (req, res, next) => {
  const { id } = req.params;

  let query = await { _id: ObjectId(id) };

  const options = await {
    db: 'theautomobiles',
    table: 'orders',
    method: 'find',
    data: {
      find: query,
      limit: 1,
      skip: 0,
    },
  };
  const data = await database(options);

  if (data?.length <= 0) {
    res.send({
      response: 200,
      message: 'No data found',
    });
  }

  res.send(data);
};

/**
 * Update a order
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.updateSingleOrder = async (req, res, next) => {
  const { id } = req.params;
  const { name, price } = await req.body;

  const filterQuery = { _id: ObjectId(id) };
  const replacementQuery = { $set: { name, price } };
  const options = {
    db: 'theautomobiles',
    table: 'orders',
    method: 'updateOne',
    data: {
      current: filterQuery,
      replace: replacementQuery,
    },
  };
  const result = await database(options);
  console.log(result);

  res.send(result);
};

/**
 * Track Order
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.trackOrder = async (req, res, next) => {
  const { id, email } = await req.params;

  let query = await { _id: ObjectId(id), email: email };

  const options = await {
    db: 'theautomobiles',
    table: 'orders',
    method: 'find',
    data: {
      find: query,
    },
  };
  const data = await database(options);

  await res.send(data[0]);
};
