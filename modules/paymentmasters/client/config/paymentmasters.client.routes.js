(function () {
  'use strict';

  angular
    .module('paymentmasters')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('paymentmasters', {
        abstract: true,
        url: '/paymentmasters',
        template: '<ui-view/>'
      })
      .state('paymentmasters.list', {
        url: '',
        templateUrl: 'modules/paymentmasters/client/views/list-paymentmasters.client.view.html',
        controller: 'PaymentmastersListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Paymentmasters List'
        }
      })
      .state('paymentmasters.create', {
        url: '/create',
        templateUrl: 'modules/paymentmasters/client/views/form-paymentmaster.client.view.html',
        controller: 'PaymentmastersController',
        controllerAs: 'vm',
        resolve: {
          paymentmasterResolve: newPaymentmaster
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Paymentmasters Create'
        }
      })
      .state('paymentmasters.edit', {
        url: '/:paymentmasterId/edit',
        templateUrl: 'modules/paymentmasters/client/views/form-paymentmaster.client.view.html',
        controller: 'PaymentmastersController',
        controllerAs: 'vm',
        resolve: {
          paymentmasterResolve: getPaymentmaster
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Paymentmaster {{ paymentmasterResolve.name }}'
        }
      })
      .state('paymentmasters.view', {
        url: '/:paymentmasterId',
        templateUrl: 'modules/paymentmasters/client/views/view-paymentmaster.client.view.html',
        controller: 'PaymentmastersController',
        controllerAs: 'vm',
        resolve: {
          paymentmasterResolve: getPaymentmaster
        },
        data: {
          pageTitle: 'Paymentmaster {{ paymentmasterResolve.name }}'
        }
      });
  }

  getPaymentmaster.$inject = ['$stateParams', 'PaymentmastersService'];

  function getPaymentmaster($stateParams, PaymentmastersService) {
    return PaymentmastersService.get({
      paymentmasterId: $stateParams.paymentmasterId
    }).$promise;
  }

  newPaymentmaster.$inject = ['PaymentmastersService'];

  function newPaymentmaster(PaymentmastersService) {
    return new PaymentmastersService();
  }
}());
