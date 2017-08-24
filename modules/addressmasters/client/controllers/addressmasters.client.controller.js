(function () {
  'use strict';

  // Addressmasters controller
  angular
    .module('addressmasters')
    .controller('AddressmastersController', AddressmastersController);

  AddressmastersController.$inject = ['$scope', '$state', '$window', 'Authentication', 'addressmasterResolve'];

  function AddressmastersController ($scope, $state, $window, Authentication, addressmaster) {
    var vm = this;

    vm.authentication = Authentication;
    vm.addressmaster = addressmaster;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Addressmaster
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.addressmaster.$remove($state.go('addressmasters.list'));
      }
    }

    // Save Addressmaster
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.addressmasterForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.addressmaster._id) {
        vm.addressmaster.$update(successCallback, errorCallback);
      } else {
        vm.addressmaster.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('addressmasters.view', {
          addressmasterId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
