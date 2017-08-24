'use strict';

describe('Paymentmasters E2E Tests:', function () {
  describe('Test Paymentmasters page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/paymentmasters');
      expect(element.all(by.repeater('paymentmaster in paymentmasters')).count()).toEqual(0);
    });
  });
});
