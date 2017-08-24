(function () {
  'use strict';

  angular
    .module('paymentmasters')
    .controller('PaymentmastersListController', PaymentmastersListController);

  PaymentmastersListController.$inject = ['PaymentmastersService'];

  function PaymentmastersListController(PaymentmastersService) {
    var vm = this;

    vm.paymentmasters = PaymentmastersService.query();
  }
}());
