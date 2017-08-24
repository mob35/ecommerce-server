'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Shop = mongoose.model('Shop'),
  User = mongoose.model('User'),
  Addressmaster = mongoose.model('Addressmaster'),
  // ManageUserShop = mongoose.model('ManageUserShop'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Manage user shop
 */
exports.createUser = function (req, res, next) {
  var user1 = new User(req.body);
  var message = null;
  req.shop = req.body.shop;

  // Add missing user fields
  user1.provider = 'local';
  user1.displayName = user1.firstName + ' ' + user1.lastName;

  // Then save the user
  user1.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      req.createuser = user1;
      next();
    }
  });
};

exports.createShop = function (req, res, next) {
  var shop = new Shop(req.shop);
  shop.user = req.createuser;
  shop.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      req.shop = shop;
      next();
      // res.jsonp({ user: req.createuser, shop: shop });
    }
  });

};

exports.createAddress = function (req, res, next) {
  var address = new Addressmaster(req.body.address);
  address.user = req.createuser;
  address.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      req.address = address;
      next();
      // res.jsonp({ user: req.createuser, shop: shop });
    }
  });

};

exports.updateAddressToShop = function (req, res, next) {

  Shop.findById(req.shop._id, function (err, shop) {

    shop.address = [{ address: req.address }];
    shop.save(function (err) {
      if (err) {
        console.log('update shop error');
        console.log(err);
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.jsonp({
          user: req.createuser,
          shop: shop
        });
      }
    });
  });

};

/**
 * Show the current Manage user shop
 */
// exports.read = function (req, res) {
//   // convert mongoose document to JSON
//   var manageUserShop = req.manageUserShop ? req.manageUserShop.toJSON() : {};

//   // Add a custom field to the Article, for determining if the current User is the "owner".
//   // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
//   manageUserShop.isCurrentUserOwner = req.user && manageUserShop.user && manageUserShop.user._id.toString() === req.user._id.toString();

//   res.jsonp(manageUserShop);
// };

 /**
 * Update a Manage user shop
 */
// exports.update = function (req, res) {
//   var manageUserShop = req.manageUserShop;

//   manageUserShop = _.extend(manageUserShop, req.body);

//   manageUserShop.save(function (err) {
//     if (err) {
//       return res.status(400).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     } else {
//       res.jsonp(manageUserShop);
//     }
//   });
// };

/**
 * Delete an Manage user shop
 */
// exports.delete = function (req, res) {
//   var manageUserShop = req.manageUserShop;

//   manageUserShop.remove(function (err) {
//     if (err) {
//       return res.status(400).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     } else {
//       res.jsonp(manageUserShop);
//     }
//   });
// };

/**
 * List of Manage user shops
 */
// exports.list = function (req, res) {
//   ManageUserShop.find().sort('-created').populate('user', 'displayName').exec(function (err, manageUserShops) {
//     if (err) {
//       return res.status(400).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     } else {
//       res.jsonp(manageUserShops);
//     }
//   });
// };

/**
 * Manage user shop middleware
 */
// exports.manageUserShopByID = function (req, res, next, id) {

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).send({
//       message: 'Manage user shop is invalid'
//     });
//   }

//   ManageUserShop.findById(id).populate('user', 'displayName').exec(function (err, manageUserShop) {
//     if (err) {
//       return next(err);
//     } else if (!manageUserShop) {
//       return res.status(404).send({
//         message: 'No Manage user shop with that identifier has been found'
//       });
//     }
//     req.manageUserShop = manageUserShop;
//     next();
//   });
// };
