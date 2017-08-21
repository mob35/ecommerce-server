'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Order = mongoose.model('Order'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    _ = require('lodash');

/**
 * Create a Payment
 */
exports.createPayment = function(req, res) {

    var order = new Order(req.body);
    order.user = req.user;
    order.amount = 0;
    order.items.forEach(function(product) {
        order.amount += product.amount;
    });
    order.totalamount = (order.amount - order.discount);

    order.save(function(err) {
        if (err) {
            console.log(err);
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(order);
        }
    });
};