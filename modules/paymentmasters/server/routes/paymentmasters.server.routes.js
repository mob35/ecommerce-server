'use strict';

/**
 * Module dependencies
 */
var paymentmastersPolicy = require('../policies/paymentmasters.server.policy'),
  paymentmasters = require('../controllers/paymentmasters.server.controller');

module.exports = function(app) {
  // Paymentmasters Routes
  app.route('/api/paymentmasters').all(paymentmastersPolicy.isAllowed)
    .get(paymentmasters.list)
    .post(paymentmasters.create);

  app.route('/api/paymentmasters/:paymentmasterId').all(paymentmastersPolicy.isAllowed)
    .get(paymentmasters.read)
    .put(paymentmasters.update)
    .delete(paymentmasters.delete);

  // Finish by binding the Paymentmaster middleware
  app.param('paymentmasterId', paymentmasters.paymentmasterByID);
};
