'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Addressmaster Schema
 */
var AddressmasterSchema = new Schema({
  firstname: {
    type: String,
    required: 'Please fill Addressmaster firstname',
    trim: true
  },
  lastname: {
    type: String,
    required: 'Please fill Addressmaster lastname',
    trim: true
  },
  address: {
    type: String,
    required: 'Please fill Addressmaster lastname',
    trim: true
  },
  postcode: {
    type: String,
    required: 'Please fill Addressmaster postcode',
    trim: true
  },
  subdistrict: {
    type: String,
    required: 'Please fill Addressmaster subdistrict',
    trim: true
  },
  district: {
    type: String,
    required: 'Please fill Addressmaster district',
    trim: true
  },
  province: {
    type: String,
    required: 'Please fill Addressmaster province',
    trim: true
  },
  tel: {
    type: String,
    required: 'Please fill Addressmaster tel',
    trim: true
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

mongoose.model('Addressmaster', AddressmasterSchema);
