'use strict';

/**
 * Module dependencies
 */
var manageUserShopsPolicy = require('../policies/manage-user-shops.server.policy'),
  manageUserShops = require('../controllers/manage-user-shops.server.controller');

module.exports = function (app) {
  // Manage user shops Routes
  app.route('/api/manage-user-shops')
    // .get(manageUserShops.list)
    .post(manageUserShops.createUser, manageUserShops.createShop, manageUserShops.createAddress, manageUserShops.updateAddressToShop);

  // app.route('/api/manage-user-shops/:manageUserShopId').all(manageUserShopsPolicy.isAllowed)
  //   .get(manageUserShops.read)
  //   .put(manageUserShops.update)
  //   .delete(manageUserShops.delete);

  // Finish by binding the Manage user shop middleware
  // app.param('manageUserShopId', manageUserShops.manageUserShopByID);
};
