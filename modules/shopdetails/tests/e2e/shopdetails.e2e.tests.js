'use strict';

describe('Shopdetails E2E Tests:', function () {
  describe('Test Shopdetails page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/shopdetails');
      expect(element.all(by.repeater('shopdetail in shopdetails')).count()).toEqual(0);
    });
  });
});
