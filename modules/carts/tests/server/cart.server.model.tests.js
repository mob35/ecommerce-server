'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Cart = mongoose.model('Cart'),
  Product = mongoose.model('Product');

/**
 * Globals
 */
var user,
  cart,
  product;

/**
 * Unit tests
 */
describe('Cart Model Unit Tests:', function () {
  beforeEach(function (done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    product = new Product({
      name: 'Product name',
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
      }]
    });

    user.save(function () {
      product.save(function () {
        cart = new Cart({
          products: [{
            product: product,
            itemamount: 100,
            qty: 1
          }],
          amount: 100,
          user: user
        });

        done();
      });
    });
  });

  describe('Method Save', function () {
    it('should be able to save without problems', function (done) {
      this.timeout(0);
      return cart.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without products', function (done) {
      cart.products = [];

      return cart.save(function (err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function (done) {
    Cart.remove().exec(function () {
      Product.remove().exec(function () {
        User.remove().exec(function () {
          done();
        });
      });
    });
  });
});
