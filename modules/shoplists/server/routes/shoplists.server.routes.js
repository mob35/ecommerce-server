'use strict';

/**
 * Module dependencies
 */
var shoplistsPolicy = require('../policies/shoplists.server.policy'),
  shoplists = require('../controllers/shoplists.server.controller');

module.exports = function(app) {
  // Shoplists Routes
  app.route('/api/shoplists')//.all(shoplistsPolicy.isAllowed)
    .get(shoplists.read);
    // .post(shoplists.create);

  // app.route('/api/shoplists/:shoplistId').all(shoplistsPolicy.isAllowed)
  //   .get(shoplists.read)
  //   .put(shoplists.update)
  //   .delete(shoplists.delete);

  // Finish by binding the Shoplist middleware
  // app.param('shoplistId', shoplists.shoplistByID);
};
