// Paymentmasters service used to communicate Paymentmasters REST endpoints
(function () {
  'use strict';

  angular
    .module('paymentmasters')
    .factory('PaymentmastersService', PaymentmastersService);

  PaymentmastersService.$inject = ['$resource'];

  function PaymentmastersService($resource) {
    return $resource('api/paymentmasters/:paymentmasterId', {
      paymentmasterId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
