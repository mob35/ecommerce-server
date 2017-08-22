'use strict';

/**
 * Module dependencies
 */
var shopdetailsPolicy = require('../policies/shopdetails.server.policy'),
  shopdetails = require('../controllers/shopdetails.server.controller');

module.exports = function (app) {

  app.route('/api/shopdetails/:shopdetailId')//.all(shopdetailsPolicy.isAllowed)
    .get(shopdetails.productbyshop, shopdetails.read);

  // Finish by binding the Shopdetail middleware
  app.param('shopdetailId', shopdetails.shopdetailByID);
};
