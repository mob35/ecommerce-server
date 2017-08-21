'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Product = mongoose.model('Product');

/**
 * Globals
 */
var user,
  product;

/**
 * Unit tests
 */
describe('Product Model Unit Tests:', function () {
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
      product = new Product({
        name: 'Product Name',
        detail: 'Product detail',
        unitprice: 100,
        qty: 10,
        img: [{
          url: 'img url',
          id: 'img id'
        }],
        preparedays: 10,
        favorite: [{
          customerid: user,
          favdate: new Date('2017-08-21')
        }],
        historylog: [{
          customerid: user,
          hisdate: new Date('2017-08-21')
        }],
        user: user,
        // shopseller: ''
      });

      done();
    });
  });

  describe('Method Save', function () {
    it('should be able to save without problems', function (done) {
      this.timeout(0);
      return product.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function (done) {
      product.name = '';

      return product.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without unitprice', function (done) {
      product.unitprice = null;

      return product.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without img', function (done) {
      product.img = [];

      return product.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without preparedays', function (done) {
      product.preparedays = null;

      return product.save(function (err) {
        should.exist(err);
        done();
      });
    });

  });

  afterEach(function (done) {
    Product.remove().exec(function () {
      User.remove().exec(function () {
        done();
      });
    });
  });
});
