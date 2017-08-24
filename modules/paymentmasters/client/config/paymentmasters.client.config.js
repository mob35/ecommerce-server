(function () {
  'use strict';

  angular
    .module('paymentmasters')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Paymentmasters',
      state: 'paymentmasters',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'paymentmasters', {
      title: 'List Paymentmasters',
      state: 'paymentmasters.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'paymentmasters', {
      title: 'Create Paymentmaster',
      state: 'paymentmasters.create',
      roles: ['user']
    });
  }
}());
