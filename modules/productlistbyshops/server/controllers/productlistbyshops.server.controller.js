'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Product = mongoose.model('Product'),
    Shop = mongoose.model('Shop'),
    Shipping = mongoose.model('Shipping'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    _ = require('lodash');


exports.productlistbyshopByID = function(req, res, next, productlistbyshopId) {

    Product.find({ shopseller: { _id: productlistbyshopId } }).populate('shopseller').exec(function(err, product) {
        if (err) {
            return next(err);
        } else if (!product) {
            return res.status(404).send({
                message: 'No Product with that identifier has been found'
            });
        }
        console.log(product);

        req.shopId = product;
        next();
    });
};

exports.read = function(req, res) {
    res.jsonp(req.shopId);

};