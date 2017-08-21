'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Shop = mongoose.model('Shop');

/**
 * Globals
 */
var user,
  shop;

/**
 * Unit tests
 */
describe('Shop Model Unit Tests:', function () {
  beforeEach(function (done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function () {
      shop = new Shop({
        name: 'Shop Name',
        detail: 'Shop detail of Shop Name',
        email: 'Shop@shop.com',
        tel: '0999999999',
        map: {
          lat: '100',
          lng: '100'
        },
        img: [
          {
            url: 'testurl'
          }
        ],
        user: user
      });

      done();
    });
  });

  describe('Method Save', function () {
    it('should be able to save without problems', function (done) {
      this.timeout(0);
      return shop.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function (done) {
      shop.name = '';

      return shop.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without detail', function (done) {
      shop.detail = '';

      return shop.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without email', function (done) {
      shop.email = '';

      return shop.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without tel', function (done) {
      shop.tel = '';

      return shop.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without img', function (done) {
      shop.img = null;

      return shop.save(function (err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function (done) {
    Shop.remove().exec(function () {
      User.remove().exec(function () {
        done();
      });
    });
  });
});
