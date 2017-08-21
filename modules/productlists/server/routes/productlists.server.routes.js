'use strict';

/**
 * Module dependencies
 */
var productlistsPolicy = require('../policies/productlists.server.policy'),
    productlists = require('../controllers/productlists.server.controller');

module.exports = function(app) {
    // Productlists Routes
    app.route('/api/productlists') //.all(productlistsPolicy.isAllowed)
        .get(productlists.read, productlists.listproduct);
    // .post(productlists.create);

    // app.route('/api/productlists/:productlistId').all(productlistsPolicy.isAllowed)
    //   .get(productlists.read)
    //   .put(productlists.update)
    //   .delete(productlists.delete);

    // Finish by binding the Productlist middleware
    // app.param('productlistId', productlists.productlistByID);
};