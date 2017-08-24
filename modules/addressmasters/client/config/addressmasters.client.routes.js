(function () {
  'use strict';

  angular
    .module('addressmasters')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('addressmasters', {
        abstract: true,
        url: '/addressmasters',
        template: '<ui-view/>'
      })
      .state('addressmasters.list', {
        url: '',
        templateUrl: 'modules/addressmasters/client/views/list-addressmasters.client.view.html',
        controller: 'AddressmastersListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Addressmasters List'
        }
      })
      .state('addressmasters.create', {
        url: '/create',
        templateUrl: 'modules/addressmasters/client/views/form-addressmaster.client.view.html',
        controller: 'AddressmastersController',
        controllerAs: 'vm',
        resolve: {
          addressmasterResolve: newAddressmaster
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Addressmasters Create'
        }
      })
      .state('addressmasters.edit', {
        url: '/:addressmasterId/edit',
        templateUrl: 'modules/addressmasters/client/views/form-addressmaster.client.view.html',
        controller: 'AddressmastersController',
        controllerAs: 'vm',
        resolve: {
          addressmasterResolve: getAddressmaster
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Addressmaster {{ addressmasterResolve.name }}'
        }
      })
      .state('addressmasters.view', {
        url: '/:addressmasterId',
        templateUrl: 'modules/addressmasters/client/views/view-addressmaster.client.view.html',
        controller: 'AddressmastersController',
        controllerAs: 'vm',
        resolve: {
          addressmasterResolve: getAddressmaster
        },
        data: {
          pageTitle: 'Addressmaster {{ addressmasterResolve.name }}'
        }
      });
  }

  getAddressmaster.$inject = ['$stateParams', 'AddressmastersService'];

  function getAddressmaster($stateParams, AddressmastersService) {
    return AddressmastersService.get({
      addressmasterId: $stateParams.addressmasterId
    }).$promise;
  }

  newAddressmaster.$inject = ['AddressmastersService'];

  function newAddressmaster(AddressmastersService) {
    return new AddressmastersService();
  }
}());
