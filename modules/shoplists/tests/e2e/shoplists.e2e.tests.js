'use strict';

describe('Shoplists E2E Tests:', function () {
  describe('Test Shoplists page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/shoplists');
      expect(element.all(by.repeater('shoplist in shoplists')).count()).toEqual(0);
    });
  });
});
