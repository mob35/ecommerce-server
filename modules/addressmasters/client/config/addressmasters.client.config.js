(function () {
  'use strict';

  angular
    .module('addressmasters')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Addressmasters',
      state: 'addressmasters',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'addressmasters', {
      title: 'List Addressmasters',
      state: 'addressmasters.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'addressmasters', {
      title: 'Create Addressmaster',
      state: 'addressmasters.create',
      roles: ['user']
    });
  }
}());
