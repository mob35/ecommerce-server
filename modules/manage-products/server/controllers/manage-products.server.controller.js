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

exports.manageProductByID = function (req, res, next, productID) {
  req.productID = productID;
  next();
};

exports.create = function (req, res) {
  var product = new Product(req.body);
  product.save(function (err, result) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp({
        success: true,
        message: result
      });
    }
  });
};

exports.update = function (req, res) {
  Product.findByIdAndUpdate({ '_id': req.productID }, req.body).exec(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp({
        success: true,
        message: req.body
      });
    }
  });
};
