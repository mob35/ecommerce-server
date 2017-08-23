'use strict';

describe('Manage user shops E2E Tests:', function () {
  describe('Test Manage user shops page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/manage-user-shops');
      expect(element.all(by.repeater('manage-user-shop in manage-user-shops')).count()).toEqual(0);
    });
  });
});
