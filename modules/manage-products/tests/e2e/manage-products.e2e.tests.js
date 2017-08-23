'use strict';

describe('Manage products E2E Tests:', function () {
  describe('Test Manage products page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/manage-products');
      expect(element.all(by.repeater('manage-product in manage-products')).count()).toEqual(0);
    });
  });
});
