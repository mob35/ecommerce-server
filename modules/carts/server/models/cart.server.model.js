'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Cart Schema
 */
var CartSchema = new Schema({
  products: {
    type: [{
      product: {
        type: Schema.ObjectId,
        ref: 'Product'
      },
      selectedsize: {
        type: String
      },
      itemamount: {
        type: Number
      },
      qty: {
        type: Number
      }
    }],
  },
  amount: {
    type: Number,
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Cart', CartSchema);
