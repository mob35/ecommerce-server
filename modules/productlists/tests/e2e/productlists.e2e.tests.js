'use strict';

describe('Productlists E2E Tests:', function () {
  describe('Test Productlists page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/productlists');
      expect(element.all(by.repeater('productlist in productlists')).count()).toEqual(0);
    });
  });
});
