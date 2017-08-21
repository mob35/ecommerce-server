'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Shop Schema
 */
var ShopSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Shop name',
    trim: true
  },
  detail: {
    type: String,
    required: 'Please fill Shop detail',
    trim: true
  },
  email: {
    type: String,
    required: 'Please fill Shop email'
  },
  tel: {
    type: String,
    required: 'Please fill Shop tel'
  },
  img: {
    required: 'Please fill Shop img',
    type: [
      {
        url: String
      }
    ]
  },
  map: {
    lat: {
      type: String
    },
    lng: {
      type: String
    }
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

mongoose.model('Shop', ShopSchema);
