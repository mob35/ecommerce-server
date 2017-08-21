'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Product Schema
 */
var ProductSchema = new Schema({
  name: {
    type: String,
    required: 'Please fill Product name'
  },
  detail: {
    type: String
  },
  unitprice: {
    type: Number,
    required: 'Please fill Product unitprice',
  },
  qty: {
    type: Number
  },
  img: {
    required: 'Please fill Product img',
    type: [{
      url: String,
      id: String
    }]
  },
  preparedays: {
    type: Number,
    required: 'Please fill Product preparedays',
  },
  favorite: {
    type: [{
      customerid: {
        type: Schema.ObjectId,
        ref: 'User'
      },
      favdate: {
        type: Date,
        default: Date.now
      }
    }]
  },
  historylog: {
    type: [{
      customerid: {
        type: Schema.ObjectId,
        ref: 'User'
      },
      hisdate: {
        type: Date,
        default: Date.now
      }
    }]
  },
  // shopseller: {
  //   required: 'Please fill Product shopseller',
  //   type: Schema.ObjectId,
  //   ref: 'Shopseller'
  // },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Product', ProductSchema);
