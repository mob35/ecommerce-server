'use strict';

describe('Listorderbyshops E2E Tests:', function () {
  describe('Test Listorderbyshops page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/listorderbyshops');
      expect(element.all(by.repeater('listorderbyshop in listorderbyshops')).count()).toEqual(0);
    });
  });
});
