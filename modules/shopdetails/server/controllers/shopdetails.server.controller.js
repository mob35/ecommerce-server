'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Shop = mongoose.model('Shop'),
  Product = mongoose.model('Product'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

exports.read = function (req, res) {
  var data = {
    name: req.shopdetail.name,
    img: req.shopdetail.img,
    map: req.shopdetail.map,
    detail: req.shopdetail.detail,
    email: req.shopdetail.email,
    tel: req.shopdetail.tel,
    _id: req.shopdetail._id,
    products: req.products
  };
  res.jsonp({ shop: data });
};

exports.productbyshop = function (req, res, next) {
  Product.find({ shopseller: req.shopid }).populate('user', 'displayName').exec(function (err, products) {
    if (err) {
      return next(err);
    } else if (!products) {
      return res.status(404).send({
        message: 'No products with that identifier has been found'
      });
    }
    req.products = products;
    next();
  });
};

exports.shopdetailByID = function (req, res, next, id) {
  req.shopid = id;
  var test = {};
  Shop.findById(id).populate('user', 'displayName').exec(function (err, shopdetail) {
    if (err) {
      return next(err);
    } else if (!shopdetail) {
      return res.status(404).send({
        message: 'No Shopdetail with that identifier has been found'
      });
    }
    req.shopdetail = shopdetail;
    next();
  });
};
