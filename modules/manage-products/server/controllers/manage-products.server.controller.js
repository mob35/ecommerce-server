'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Product = mongoose.model('Product'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Manage product
 */

exports.getProductID = function (req, res, next, productID) {
  req.productID = productID;
  next();
};

exports.create = function (req, res) {
  var product = new Product(req.body);
  product.save().exec(function (err, result) {
    if (err) {
      return res.status(404).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      console.log('================DATA FROM CONTROLLER==============');
      console.log(result);
      console.log('==================================================');
      res.jsonp({
        success: true,
        message: result
      });
    }
  });
};

exports.update = function (req, res) {

};
