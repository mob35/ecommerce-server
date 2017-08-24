'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Categorymaster Schema
 */
var CategorymasterSchema = new Schema({
  name: {
    type: String,
    required: 'Please fill category name'
  },
  detail: {
    type: String,
    required: 'Please fill category detail'
  },
  parent: {
    type: String,
    required: 'Please fill parent category'
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

mongoose.model('Categorymaster', CategorymasterSchema);
