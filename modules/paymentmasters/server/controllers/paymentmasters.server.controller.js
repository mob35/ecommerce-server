'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Paymentmaster = mongoose.model('Paymentmaster'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Paymentmaster
 */
exports.create = function(req, res) {
  var paymentmaster = new Paymentmaster(req.body);
  paymentmaster.user = req.user;

  paymentmaster.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(paymentmaster);
    }
  });
};

/**
 * Show the current Paymentmaster
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var paymentmaster = req.paymentmaster ? req.paymentmaster.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  paymentmaster.isCurrentUserOwner = req.user && paymentmaster.user && paymentmaster.user._id.toString() === req.user._id.toString();

  res.jsonp(paymentmaster);
};

/**
 * Update a Paymentmaster
 */
exports.update = function(req, res) {
  var paymentmaster = req.paymentmaster;

  paymentmaster = _.extend(paymentmaster, req.body);

  paymentmaster.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(paymentmaster);
    }
  });
};

/**
 * Delete an Paymentmaster
 */
exports.delete = function(req, res) {
  var paymentmaster = req.paymentmaster;

  paymentmaster.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(paymentmaster);
    }
  });
};

/**
 * List of Paymentmasters
 */
exports.list = function(req, res) {
  Paymentmaster.find().sort('-created').populate('user', 'displayName').exec(function(err, paymentmasters) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(paymentmasters);
    }
  });
};

/**
 * Paymentmaster middleware
 */
exports.paymentmasterByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Paymentmaster is invalid'
    });
  }

  Paymentmaster.findById(id).populate('user', 'displayName').exec(function (err, paymentmaster) {
    if (err) {
      return next(err);
    } else if (!paymentmaster) {
      return res.status(404).send({
        message: 'No Paymentmaster with that identifier has been found'
      });
    }
    req.paymentmaster = paymentmaster;
    next();
  });
};
