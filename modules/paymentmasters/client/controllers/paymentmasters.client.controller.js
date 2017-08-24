(function () {
  'use strict';

  // Paymentmasters controller
  angular
    .module('paymentmasters')
    .controller('PaymentmastersController', PaymentmastersController);

  PaymentmastersController.$inject = ['$scope', '$state', '$window', 'Authentication', 'paymentmasterResolve'];

  function PaymentmastersController ($scope, $state, $window, Authentication, paymentmaster) {
    var vm = this;

    vm.authentication = Authentication;
    vm.paymentmaster = paymentmaster;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Paymentmaster
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.paymentmaster.$remove($state.go('paymentmasters.list'));
      }
    }

    // Save Paymentmaster
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.paymentmasterForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.paymentmaster._id) {
        vm.paymentmaster.$update(successCallback, errorCallback);
      } else {
        vm.paymentmaster.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('paymentmasters.view', {
          paymentmasterId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
