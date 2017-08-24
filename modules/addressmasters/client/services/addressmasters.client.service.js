// Addressmasters service used to communicate Addressmasters REST endpoints
(function () {
  'use strict';

  angular
    .module('addressmasters')
    .factory('AddressmastersService', AddressmastersService);

  AddressmastersService.$inject = ['$resource'];

  function AddressmastersService($resource) {
    return $resource('api/addressmasters/:addressmasterId', {
      addressmasterId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
