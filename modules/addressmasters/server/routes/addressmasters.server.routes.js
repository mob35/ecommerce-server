'use strict';

/**
 * Module dependencies
 */
var addressmastersPolicy = require('../policies/addressmasters.server.policy'),
  addressmasters = require('../controllers/addressmasters.server.controller');

module.exports = function(app) {
  // Addressmasters Routes
  app.route('/api/addressmasters').all(addressmastersPolicy.isAllowed)
    .get(addressmasters.list)
    .post(addressmasters.create);

  app.route('/api/addressmasters/:addressmasterId').all(addressmastersPolicy.isAllowed)
    .get(addressmasters.read)
    .put(addressmasters.update)
    .delete(addressmasters.delete);

  // Finish by binding the Addressmaster middleware
  app.param('addressmasterId', addressmasters.addressmasterByID);
};
