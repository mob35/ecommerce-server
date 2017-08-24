'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Addressmaster = mongoose.model('Addressmaster'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Addressmaster
 */
exports.create = function(req, res) {
  var addressmaster = new Addressmaster(req.body);
  addressmaster.user = req.user;

  addressmaster.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(addressmaster);
    }
  });
};

/**
 * Show the current Addressmaster
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var addressmaster = req.addressmaster ? req.addressmaster.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  addressmaster.isCurrentUserOwner = req.user && addressmaster.user && addressmaster.user._id.toString() === req.user._id.toString();

  res.jsonp(addressmaster);
};

/**
 * Update a Addressmaster
 */
exports.update = function(req, res) {
  var addressmaster = req.addressmaster;

  addressmaster = _.extend(addressmaster, req.body);

  addressmaster.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(addressmaster);
    }
  });
};

/**
 * Delete an Addressmaster
 */
exports.delete = function(req, res) {
  var addressmaster = req.addressmaster;

  addressmaster.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(addressmaster);
    }
  });
};

/**
 * List of Addressmasters
 */
exports.list = function(req, res) {
  Addressmaster.find().sort('-created').populate('user', 'displayName').exec(function(err, addressmasters) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(addressmasters);
    }
  });
};

/**
 * Addressmaster middleware
 */
exports.addressmasterByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Addressmaster is invalid'
    });
  }

  Addressmaster.findById(id).populate('user', 'displayName').exec(function (err, addressmaster) {
    if (err) {
      return next(err);
    } else if (!addressmaster) {
      return res.status(404).send({
        message: 'No Addressmaster with that identifier has been found'
      });
    }
    req.addressmaster = addressmaster;
    next();
  });
};
