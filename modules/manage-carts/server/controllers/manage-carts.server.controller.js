'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Cart = mongoose.model('Cart'),
  Product = mongoose.model('Product'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');


// Custom cart

exports.findUserCart = function (req, res, next) {
  // req.user._id 
  Cart.find({
      user: req.body.user._id 
    })
    .populate('user', 'displayName')
    .populate({
      path: 'products',
      populate: {
        path: 'product',
        model: 'Product'
      }
    }).exec(function (err, cart) {
      if (err) {
        return next(err);
      } else if (!cart) {
        return res.status(404).send({
          message: 'No Cart with that identifier has been found'
        });
      }
      req.cart = cart;
      next();
    });
};

exports.processingAddUserCart = function (req, res, next) {

  var product = req.body;

  if (req.cart.length > 0) {
    var item = req.cart[0];
    var data = item.products.filter(function (obj) {
      return obj.product._id.toString() === product._id.toString();
    });
    if (data.length > 0) {
      data[0].qty++;
      data[0].itemamount = data[0].product.unitprice * data[0].qty;
    } else {
      item.products.push({
        product: product,
        qty: 1,
        itemamount: product.unitprice
      });
    }

    item.amount = 0;
    item.products.forEach(function (element) {
      item.amount += element.itemamount;
    });
    req.userCart = item;
    next();

  } else {
    var products = [{
      product: product,
      qty: 1,
      itemamount: product.unitprice
    }];
    var userCart = {
      products: products,
      amount: product.unitprice
    };
    req.userCart = userCart;
    next();

  }
};

exports.processingRemoveUserCart = function (req, res, next) {

  var product = req.body;
  var item = req.cart[0];
  var data = item.products.filter(function (obj) {
    return obj.product._id.toString() === product._id.toString();
  });
  data[0].qty--;
  data[0].itemamount = data[0].product.unitprice * data[0].qty;
  item.amount = 0;
  item.products.forEach(function (element) {
    item.amount += element.itemamount;
  });
  req.userCart = item;
  next();

};

exports.processingDeleteUserCart = function (req, res, next) {

  var product = req.body;
  var item = req.cart[0];
  var index = -1;
  item.products.filter(function (obj, i) {
    if (obj.product._id.toString() === product._id.toString()) {
      index = i;
      return;
    }
  });

  item.products.splice(index, 1);
  item.amount = 0;
  item.products.forEach(function (element) {
    item.amount += element.itemamount;
  });
  req.userCart = item;
  next();

};

exports.saveUserCart = function (req, res, next) {

  if (req.cart.length > 0) {
    next();
  } else {
    var cart = new Cart(req.userCart);
    cart.user = req.user;
    cart.save(function (err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.jsonp(cart);
      }
    });
  }
};

exports.updateUserCart = function (req, res) {
  var cart = new Cart(req.cart[0]);
  cart = _.extend(cart, req.userCart);
  cart.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(cart);
    }
  });
};

exports.sendCart = function (req, res) {
  res.jsonp(req.cart[0]);
};
