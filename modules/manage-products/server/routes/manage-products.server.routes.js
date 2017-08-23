'use strict';

/**
 * Module dependencies
 */
var manageProductsPolicy = require('../policies/manage-products.server.policy'),
  manageProducts = require('../controllers/manage-products.server.controller');

module.exports = function(app) {
  // Manage products Routes
  app.route('/api/manage-products').all(manageProductsPolicy.isAllowed)
    .post(manageProducts.create);

  app.route('/api/manage-products/:manageProductId').all(manageProductsPolicy.isAllowed)
    .post(manageProducts.update);

  // Finish by binding the Manage product middleware
  app.param('manageProductId', manageProducts.manageProductByID);
};
