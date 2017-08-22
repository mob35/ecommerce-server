'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    // Productlist = mongoose.model('Productlist'),
    Product = mongoose.model('Product'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    _ = require('lodash');

// /**
//  * List of Productlists
//  */
exports.read = function(req, res, next) {
    Product.find().sort('-created').exec(function(err, productlists) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            req.listprod = productlists;
            next();
        }
    });
};
exports.listproduct = function(req, res) {
    res.jsonp(req.listprod);
};