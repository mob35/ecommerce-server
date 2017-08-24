'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Addressmaster = mongoose.model('Addressmaster'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

exports.read = function (req, res) {
  res.jsonp(req.addressbyuser);
};

exports.addressbyuserByID = function (req, res, next, id) {
  Addressmaster.find({ user: { _id: id } }).sort('-created').populate('user', 'displayName').exec(function (err, addressmasters) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      req.addressbyuser = addressmasters;
      next();
    }
  });
};
