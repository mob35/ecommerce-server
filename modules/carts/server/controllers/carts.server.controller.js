'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Cart = mongoose.model('Cart'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Cart
 */
exports.create = function (req, res) {
  var cart = new Cart(req.body);
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
};

/**
 * Show the current Cart
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var cart = req.cart ? req.cart.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  cart.isCurrentUserOwner = req.user && cart.user && cart.user._id.toString() === req.user._id.toString();

  res.jsonp(cart);
};

/**
 * Update a Cart
 */
exports.update = function (req, res) {
  var cart = req.cart;

  cart = _.extend(cart, req.body);

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

/**
 * Delete an Cart
 */
exports.delete = function (req, res) {
  var cart = req.cart;

  cart.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(cart);
    }
  });
};

/**
 * List of Carts
 */
exports.list = function (req, res) {
  Cart.find().sort('-created').populate('user', 'displayName').exec(function (err, carts) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(carts);
    }
  });
};

/**
 * Cart middleware
 */
exports.cartByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Cart is invalid'
    });
  }

  Cart.findById(id).populate('user', 'displayName').exec(function (err, cart) {
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

// Custom cart

exports.findUserCart = function (req, res, next) {

  Cart.find({
      user: {
        _id: req.user._id
      }
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

    console.log(req.cart[0].products);
    var index = findWithAttr(req.cart[0].products, '_id', product._id);
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

exports.saveUserCart = function (req, res, next) {

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
};

exports.updateUserCart = function (req, res, next) {
  res.jsonp([0]);
};

function findWithAttr(array, attr, value) {
  for (var i = 0; i < array.length; i += 1) {
    if (array[i][attr] === value) {
      return i;
    }
  }
  return -1;
}

// Cart.populate(cart, {
//   path: "products",
//   populate: {
//     path: 'product',
//     model: 'Product'
//   }
// }, function (err, cart) {});
