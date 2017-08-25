'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Order = mongoose.model('Order'),
    Addressmaster = mongoose.model('Addressmaster'),
    Cart = mongoose.model('Cart'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    _ = require('lodash');

/**
 * Create a Payment
 */
exports.manageAddress = function (req, res, next) {
    var address = new Addressmaster(req.body.shipping);
    if (address && address._id) {
        req.address = address;
        next();
    } else {
        address.user = req.user;
        address.save(function (err) {
            if (err) {
                console.log(err);
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                req.address = address;
                next();
            }
        });
    }
};


exports.createPayment = function (req, res, next) {
    var order = new Order(req.body);
    order.user = req.user;
    order.shipping = req.address;
    order.amount = 0;
    order.items.forEach(function (product) {
        order.amount += product.amount;
    });
    order.totalamount = (order.amount - order.discount);

    order.save(function (err) {
        if (err) {
            console.log(err);
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            req.order = order;
            next();
        }
    });
};

exports.findCart = function (req, res, next) {
    var order = new Order(req.body);
    Cart.findById(order.cart).populate('user', 'displayName').exec(function (err, cart) {
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
exports.clearCart = function (req, res) {
    var cart = req.cart;

    cart.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(req.order);
        }
    });
};