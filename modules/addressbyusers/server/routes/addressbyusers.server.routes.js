'use strict';

/**
 * Module dependencies
 */
var addressbyusersPolicy = require('../policies/addressbyusers.server.policy'),
  addressbyusers = require('../controllers/addressbyusers.server.controller');

module.exports = function (app) {

  app.route('/api/addressbyusers/:addressbyuserId').all(addressbyusersPolicy.isAllowed)
    .get(addressbyusers.read);

  // Finish by binding the Addressbyuser middleware
  app.param('addressbyuserId', addressbyusers.addressbyuserByID);
};
