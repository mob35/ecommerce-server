'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  Shop = mongoose.model('Shop'),
  Shipping = mongoose.model('Shipping'),
  Product = mongoose.model('Product'),
  User = mongoose.model('User'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  shop,
  product,
  shopdetail,
  shipping;

/**
 * Shopdetail routes tests
 */
describe('Shopdetail CRUD tests', function () {

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

    shipping = new Shipping({
      name: 'shipping name',
      detail: 'shipping detail',
      days: 10
    });

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
      shopseller: shop,
      shippings: [{
        shipping: shipping,
        shippingprice: 10,
        shippingstartdate: new Date('2017-08-21'),
        shippingenddate: new Date('2017-08-21')
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

    // Save a user to the test db and create new Shopdetail
    user.save(function () {
      shopdetail = {
        name: 'Shopdetail name'
      };

      done();
    });
  });

  it('should be able to save a Shopdetail if logged in', function (done) {

    var shopObj = new Shop(shop);
    var productObj = new Product(product);

    productObj.shopseller = shopObj;

    shopObj.save();
    productObj.save(function () {
      agent.get('/api/shopdetails/' + shopObj.id)
        .end(function (shopdetailsGetErr, shopdetailsGetRes) {
          // Handle Shopdetails save error
          if (shopdetailsGetErr) {
            return done(shopdetailsGetErr);
          }

          // Get Shopdetails list
          var shopdetails = shopdetailsGetRes.body;

          // Set assertions
          (shopdetails.shop._id).should.equal(shopObj.id);
          (shopdetails.shop.name).should.match('Shop Name');
          (shopdetails.shop.products.length).should.match(1);

          // Call the assertion callback
          done();
        });
    });


  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Product.remove().exec(function () {
        Shop.remove().exec(function () {
          done();
        });
      });
    });
  });
});
