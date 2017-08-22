'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Product = mongoose.model('Product'),
  Shop = mongoose.model('Shop'),
  Shipping = mongoose.model('Shipping'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  product,
  credentials,
  user,
  shop,
  shipping,
  agent;

/**
 * Productdetail routes tests
 */
describe('get product detail', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
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
      name: 'Shop name',
      detail: 'Shop detail',
      email: 'Shop email',
      tel: 'Shop tel',
      img: [{
        url: 'img url'
      }],
      map: {
        lat: 'map lat',
        lng: 'map lng'
      },
    });

    shipping = new Shipping({
      name: 'shipping name',
      detail: 'shipping detail',
      days: 10
    });

    product = new Product({
      name: 'Product name',
      detail: 'Product detail',
      unitprice: 100,
      qty: 10,
      img: [{
        url: 'imgurl',
        id: 'imgid'
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
      shippings: [{
        shipping: shipping,
        shippingprice: 10,
        shippingstartdate: new Date('2017-08-21'),
        shippingenddate: new Date('2017-08-21')
      }],
      shopseller: shop
    });
    user.save(function () {
      shipping.save(function () {
        shop.save(function () {
          done();
        });
      });
    });
  });

  it('get product by id', function (done) {

    // Get a list of Products
    agent.get('/api/productdetail/ ')
      .expect(404)
      .end(function (productSaveErr, productSaveRes) {
        // Call the assertion callback
        done(productSaveErr);
      });
    // done();
  });

  it('get productdetail by id', function (done) {

    // Create new Product model instance
    var productObj = new Product(product);

    // Save the Product
    productObj.save(function (err, result) {
      agent.get('/api/productdetail/' + productObj._id)
        .end(function (req, res) {
          var products = res.body;
          (products._id).should.match(productObj.id);
          (products.name).should.match(productObj.name);
          (products.detail).should.match(productObj.detail);
          (products.unitprice).should.match(productObj.unitprice);
          (products.img[0].url).should.match(productObj.img[0].url);
          (products.img[0].id).should.match(productObj.img[0].id);
          (products.preparedays).should.match(productObj.preparedays);
          (products.favorite[0].customerid).should.match(user.id);
          (products.favorite[0].favdate).should.match(productObj.favorite[0].favdate);
          (products.historylog[0].customerid).should.match(user.id);
          (products.historylog[0].hisdate).should.match(productObj.historylog[0].hisdate);
          (products.view).should.match(0);
          (products.qty).should.match(productObj.qty);
          (products.shop).should.match(shop.id);
          (products.shippings[0].shipping).should.match(shipping.id);
          (products.shippings[0].shippingprice).should.match(productObj.shippings[0].shippingprice);
          (products.shippings[0].shippingstartdate).should.match(productObj.shippings[0].shippingstartdate);
          (products.shippings[0].shippingenddate).should.match(productObj.shippings[0].shippingenddate);
          done();
        });
    });
  });


  afterEach(function (done) {
    User.remove().exec(function () {
      Shop.remove().exec(function () {
        Shipping.remove().exec(function () {
          Product.remove().exec(done);
        });
      });
    });
  });
});
