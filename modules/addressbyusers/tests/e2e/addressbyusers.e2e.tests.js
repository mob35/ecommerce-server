'use strict';

describe('Addressbyusers E2E Tests:', function () {
  describe('Test Addressbyusers page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/addressbyusers');
      expect(element.all(by.repeater('addressbyuser in addressbyusers')).count()).toEqual(0);
    });
  });
});
