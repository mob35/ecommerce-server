'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Dashboard Schema
 */
var DashboardSchema = new Schema({
  banner_image: String,
  banner_title: String
});

mongoose.model('Dashboard', DashboardSchema);
