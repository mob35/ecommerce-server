'use strict';

/**
 * Module dependencies
 */
var productdetailsPolicy = require('../policies/productdetails.server.policy'),
  productdetails = require('../controllers/productdetails.server.controller');

module.exports = function(app) {


  app.route('/api/productdetail/:productdetailId')//.all(productdetailsPolicy.isAllowed)
    .get(productdetails.read);

  // Finish by binding the Productdetail middleware
  app.param('productdetailId', productdetails.productdetailByID);
};
