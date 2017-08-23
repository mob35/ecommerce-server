'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Product = mongoose.model('Product'),
  Shipping = mongoose.model('Shipping'),
  Shop = mongoose.model('Shop'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  shop,
  shipping,
  product,
  manageProduct;

/**
 * Manage product routes tests
 */
describe('Manage product CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    shop = new Shop({
      name: 'shop1',
      detail: 'detail shop1',
      email: 'shop1@gmail.com',
      tel: '099-9999999',
      img: [{
        url: 'shop1.jpg'
      }],
      user: user
    });

    shipping = new Shipping({
      name: 'shoping1',
      user: user
    });

    product = new Product({
      name: 'product1',
      unitprice: 100,
      img: [{
        id: '1',
        url: 'img1.jpg' //convert to Base64 bit
      }, {
        id: '2',
        url: 'img2.jpg' //convert to Base64 bit
      }],
      preparedays: 1,
      historylog: [{
        customerid: user,
        hisdate: new Date()
      }],
      shopseller: shop,
      shippings: [{
        shipping: shipping
      }],
      user: user
    });

    // Save a user to the test db and create new Manage product
    user.save(function () {
      shop.save(function () {
        shipping.save(function () {
          done();
        });
      });
    });
  });

  it('should be able to save a product if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Save a new Manage product
        agent.post('/api/manage-products-create')
          .send(product)
          .expect(200)
          .end(function (manageProductSaveErr, manageProductSaveRes) {
            // Handle Manage product save error
            if (manageProductSaveErr) {
              return done(manageProductSaveErr);
            }
            console.log('================DATA TEST CASE==============');
            console.log(manageProductSaveRes);
            console.log('============================================');
            (manageProductSaveRes).should.equal('');
            done();

          });
      });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Shop.remove().exec(function () {
        Shipping.remove().exec(function () {
          Product.remove().exec(function () {
            done();
          });
        });
      });
    });
  });
});
