'use strict';

describe('Manage carts E2E Tests:', function () {
  describe('Test Manage carts page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/manage-carts');
      expect(element.all(by.repeater('manage-cart in manage-carts')).count()).toEqual(0);
    });
  });
});
