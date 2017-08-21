'use strict';

describe('Productdetails E2E Tests:', function () {
  describe('Test Productdetails page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/productdetails');
      expect(element.all(by.repeater('productdetail in productdetails')).count()).toEqual(0);
    });
  });
});
