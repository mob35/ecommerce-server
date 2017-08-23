'use strict';

/**
 * Module dependencies
 */
var listorderbyshopsPolicy = require('../policies/listorderbyshops.server.policy'),
  listorderbyshops = require('../controllers/listorderbyshops.server.controller');

module.exports = function(app) {
  // Listorderbyshops Routes
  // app.route('/api/listorderbyshops')//.all(listorderbyshopsPolicy.isAllowed)
  //   .get(listorderbyshops.list);

  app.route('/api/listorderbyshops/:orderstatus/:listorderbyshopId').all(listorderbyshopsPolicy.isAllowed)
    .get(listorderbyshops.read);
    // .put(listorderbyshops.update);

  // Finish by binding the Listorderbyshop middleware
  app.param('listorderbyshopId', listorderbyshops.listorderbyshopByID);
  app.param('orderstatus', listorderbyshops.listorderstatus);
};
