'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Dashboard = mongoose.model('Dashboard'),
  Product = mongoose.model('Product'),
  Shop = mongoose.model('Shop'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Dashboard
 */
exports.create = function (req, res) {
  var dashboard = new Dashboard(req.body);
  dashboard.user = req.user;

  dashboard.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(dashboard);
    }
  });
};

/**
 * Show the current Dashboard
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var dashboard = req.dashboard ? req.dashboard.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  dashboard.isCurrentUserOwner = req.user && dashboard.user && dashboard.user._id.toString() === req.user._id.toString();

  res.jsonp(dashboard);
};

/**
 * Update a Dashboard
 */
exports.update = function (req, res) {
  var dashboard = req.dashboard;

  dashboard = _.extend(dashboard, req.body);

  dashboard.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(dashboard);
    }
  });
};

/**
 * Delete an Dashboard
 */
exports.delete = function (req, res) {
  var dashboard = req.dashboard;

  dashboard.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(dashboard);
    }
  });
};

/**
 * List of Dashboards
 */
exports.gettitleandbanner = function (req, res, next) {
  Dashboard.find().exec(function (err, result) {
    if (err) {
      return res.status(404).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      req.banner_image = result[0].banner_image;
      req.banner_title = result[0].banner_title;
      next();
    }
  });
};

exports.getlastvisit = function (req, res, next) {
  Product.find({ 'historylog': { $in: [req.body.userid] } }, 'name img unitprice')
    .skip(0).limit(10)
    .exec(function (err, result) {
      if (err) {
        return res.status(404).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        req.lastvisit = result;
        next();
      }
    });
};

exports.getpopularproducts = function (req, res, next) {
  Product.find({}, 'name img unitprice')
    .sort({ 'views': 1 })
    .skip(0).limit(10)
    .exec(function (err, result) {
      if (err) {
        return res.status(404).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        req.popularproducts = result;
        next();
      }
    });
};

exports.getpopularshops = function (req, res, next) {
  Shop.find({}, 'name img')
    .sort({ 'views': 1 })
    .skip(0).limit(10)
    .exec(function (err, result) {
      if (err) {
        return res.status(404).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        req.popularshops = result;
        next();
      }
    });
};

exports.list = function (req, res) {
  res.jsonp({
    banner_image: req.banner_image,
    banner_title: req.banner_title,
    lastvisit: req.lastvisit,
    popularproducts: req.popularproducts,
    popularshops: req.popularshops
  });
};

/**
 * Dashboard middleware
 */
exports.dashboardByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Dashboard is invalid'
    });
  }

  Dashboard.findById(id).populate('user', 'displayName').exec(function (err, dashboard) {
    if (err) {
      return next(err);
    } else if (!dashboard) {
      return res.status(404).send({
        message: 'No Dashboard with that identifier has been found'
      });
    }
    req.dashboard = dashboard;
    next();
  });
};
