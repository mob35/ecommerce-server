(function () {
  'use strict';

  angular
    .module('paymentmasters')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Paymentmasters',
      state: 'paymentmasters',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'paymentmasters', {
      title: 'List Paymentmasters',
      state: 'paymentmasters.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'paymentmasters', {
      title: 'Create Paymentmaster',
      state: 'paymentmasters.create',
      roles: ['user']
    });
  }
}());
