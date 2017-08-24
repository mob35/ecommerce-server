(function () {
  'use strict';

  angular
    .module('addressmasters')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Addressmasters',
      state: 'addressmasters',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'addressmasters', {
      title: 'List Addressmasters',
      state: 'addressmasters.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'addressmasters', {
      title: 'Create Addressmaster',
      state: 'addressmasters.create',
      roles: ['user']
    });
  }
}());
