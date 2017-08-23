'use strict';

/**
 * Module dependencies
 */
var manageProductsPolicy = require('../policies/manage-products.server.policy'),
  manageProducts = require('../controllers/manage-products.server.controller');

module.exports = function(app) {
  // Manage products Routes
  app.route('/api/manage-products-create').all(manageProductsPolicy.isAllowed)
    .post(manageProducts.create);

  app.route('/api/manage-products-edit/:manageProductId').all(manageProductsPolicy.isAllowed)
    .put(manageProducts.update)
    .delete(manageProducts.delete);

  // Finish by binding the Manage product middleware
  app.param('manageProductId', manageProducts.getProductID);
};
