'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Shop = mongoose.model('Shop'),
  // Shoplist = mongoose.model('Shoplist'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * List of Shoplists
 */
exports.read = function(req, res) {
  Shop.find().sort('-created').exec(function(err, shoplists) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      console.log(shoplists);
      res.jsonp(shoplists);
    }
  });
};
