'use strict';

/**
 * Module dependencies
 */
var manageCartsPolicy = require('../policies/manage-carts.server.policy'),
  manageCarts = require('../controllers/manage-carts.server.controller');

module.exports = function (app) {
  // Manage carts Routes
  app.route('/api/manage-carts/add').all(manageCartsPolicy.isAllowed)
    .post(manageCarts.findUserCart, manageCarts.processingAddUserCart, manageCarts.saveUserCart, manageCarts.updateUserCart);

  app.route('/api/manage-carts/remove').all(manageCartsPolicy.isAllowed)
    .post(manageCarts.findUserCart, manageCarts.processingRemoveUserCart, manageCarts.updateUserCart);

  app.route('/api/manage-carts/delete').all(manageCartsPolicy.isAllowed)
    .post(manageCarts.findUserCart, manageCarts.processingDeleteUserCart, manageCarts.updateUserCart);

  app.route('/api/manage-carts/get-by-user').all(manageCartsPolicy.isAllowed)
    .get(manageCarts.findUserCart, manageCarts.sendCart);

  // Finish by binding the Manage cart middleware
  // app.param('manageCartId', manageCarts.manageCartByID);
};
