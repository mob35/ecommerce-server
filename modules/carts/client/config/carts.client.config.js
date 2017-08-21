(function () {
  'use strict';

  angular
    .module('carts')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Carts',
      state: 'carts',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'carts', {
      title: 'List Carts',
      state: 'carts.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'carts', {
      title: 'Create Cart',
      state: 'carts.create',
      roles: ['user']
    });
  }
}());
