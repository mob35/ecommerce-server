'use strict';

/**
 * Module dependencies
 */
var productlistbyshopsPolicy = require('../policies/productlistbyshops.server.policy'),
    productlistbyshops = require('../controllers/productlistbyshops.server.controller');

module.exports = function(app) {
    // Productlistbyshops Routes

    app.route('/api/productlistbyshop/:productlistbyshopId') //.all(productlistbyshopsPolicy.isAllowed)
        .get(productlistbyshops.read);

    // Finish by binding the Productlistbyshop middleware
    app.param('productlistbyshopId', productlistbyshops.productlistbyshopByID);
};