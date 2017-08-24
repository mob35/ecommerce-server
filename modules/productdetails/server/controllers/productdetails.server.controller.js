'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Product = mongoose.model('Product'),
  Shop = mongoose.model('Shop'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

exports.productdetailByID = function (req, res, next, id) {
  // Product.find().exec(function (err, product) {
  //   console.log(product);
  //   if (err) {
  //     return next(err);
  //   } else if (!product) {
  //     return res.status(404).send({
  //       message: 'No Product with that identifier has been found'
  //     });
  //   }
  //   req.product = product;
  //   next();
  // });
  Product.findById(id).populate('shippings.shipping').populate('shopseller').populate('size').populate({
    path: 'category',
    model: 'Categorymaster',
    populate: {
      path: 'user',
      model: 'User'
    }
  }).exec(function (err, product) {
    // console.log(product);
    if (err) {
      return next(err);
    } else if (!product) {
      return res.status(404).send({
        message: 'No Product with that identifier has been found'
      });
    }
    req.product = product;
    next();
  });
};

exports.read = function (req, res) {
  res.jsonp({
    _id: req.product._id,
    name: req.product.name,
    detail: req.product.detail,
    unitprice: req.product.unitprice,
    img: req.product.img,
    favorite: req.product.favorite,
    historylog: req.product.historylog,
    view: req.product.view,
    preparedays: req.product.preparedays,
    qty: req.product.qty,
    shippings: req.product.shippings,
    shopseller: req.product.shopseller,
    issize: req.product.issize,
    size: req.product.size,
    category: req.product.category
  });
};

