'use strict';

describe('Addressmasters E2E Tests:', function () {
  describe('Test Addressmasters page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/addressmasters');
      expect(element.all(by.repeater('addressmaster in addressmasters')).count()).toEqual(0);
    });
  });
});
