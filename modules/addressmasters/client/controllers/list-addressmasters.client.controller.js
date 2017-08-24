(function () {
  'use strict';

  angular
    .module('addressmasters')
    .controller('AddressmastersListController', AddressmastersListController);

  AddressmastersListController.$inject = ['AddressmastersService'];

  function AddressmastersListController(AddressmastersService) {
    var vm = this;

    vm.addressmasters = AddressmastersService.query();
  }
}());
