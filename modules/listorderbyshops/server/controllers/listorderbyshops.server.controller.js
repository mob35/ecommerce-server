'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  // Listorderbyshop = mongoose.model('Listorderbyshop'),
  Order = mongoose.model('Order'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');


exports.read = function (req, res) {
  res.jsonp(req.orders);
};

exports.listorderbyshopByID = function (req, res, next, id) {
  Order.find().sort('-created').populate('user', 'displayName').populate({
    path: 'items',
    populate: {
        path: 'product',
        model: 'Product'
    }
}).exec(function (err, orders) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      var orderbyshop = orders.filter(function (obj) { 
        var item = obj.items.filter(function (obj2) {
          return obj2.product.shopseller.toString() === id.toString();
        });
        return item.length > 0 === true; 
      });
      req.orders = orderbyshop;
      next();
    }
  });
};
