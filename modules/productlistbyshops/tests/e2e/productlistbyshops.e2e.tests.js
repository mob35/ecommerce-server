'use strict';

describe('Productlistbyshops E2E Tests:', function () {
  describe('Test Productlistbyshops page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/productlistbyshops');
      expect(element.all(by.repeater('productlistbyshop in productlistbyshops')).count()).toEqual(0);
    });
  });
});
