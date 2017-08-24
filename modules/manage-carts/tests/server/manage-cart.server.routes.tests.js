'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Cart = mongoose.model('Cart'),
  Product = mongoose.model('Product'),
  Shop = mongoose.model('Shop'),
  Shipping = mongoose.model('Shipping'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  credentials2,
  user,
  user2,
  cart,
  cart2,
  shop,
  product,
  product2,
  product3,  
  shipping;


/**
 * Manage cart routes tests
 */
describe('Manage cart CRUD tests', function () {

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

    credentials2 = {
      username: 'username2',
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

    user2 = new User({
      firstName: 'Full2',
      lastName: 'Name2',
      displayName: 'Full Name2',
      email: 'test2@test.com',
      username: credentials2.username,
      password: credentials2.password,
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

    product = new Product({
      name: 'Product name',
      detail: 'Product detail',
      unitprice: 100,
      qty: 10,
      img: [{
        url: 'img url',
        id: 'img id'
      }],
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
      }],
      shopseller: shop,
      issize: true,
      selectedsize: 'S'
    });

    product2 = new Product({
      name: 'Product name2',
      detail: 'Product detail2',
      unitprice: 50,
      qty: 5,
      img: [{
        url: 'img url',
        id: 'img id'
      }],
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
      }],
      shopseller: shop,
      issize: false
    });

    cart2 = new Cart({
      products: [{
        product: product,
        itemamount: 100,
        qty: 1
      }],
      amount: 100,
      user: user2
    });

    // Save a user to the test db and create new Cart
    user.save(function () {
      user2.save(function () {
        shop.save(function () {
          product.save(function () {
            product2.save(function () {
              cart2.save(function () {
                cart = {
                  products: [{
                    product: product,
                    itemamount: 100,
                    qty: 1
                  }],
                  amount: 100,
                  user: user
                };
                done();
              });
            });
          });
        });
      });
    });
  });


  it('MDW : should be able add to cart (New no data)', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }
        // Get the userId
        var userId = user.id;
        // Save a new Cart
        agent.post('/api/manage-carts/add')
          .send(product)
          .expect(200)
          .end(function (cartSaveErr, cartSaveRes) {
            // Handle Cart save error
            if (cartSaveErr) {
              return done(cartSaveErr);
            }
            // Get Carts list
            var carts = cartSaveRes.body;
            // Set assertions
            (carts.user._id).should.equal(userId);
            (carts.products.length).should.match(1);
            (carts.amount).should.match(100);
            // Call the assertion callback
            done();
          });
      });
  });

  it('MDW : should be able add to cart (Duplicate)', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }
        // Get the userId
        var userId = user.id;
        // Save a new Cart
        agent.post('/api/manage-carts/add')
          .send(product)
          .expect(200)
          .end(function (cartSaveErr, cartSaveRes) {
            // Handle Cart save error
            if (cartSaveErr) {
              return done(cartSaveErr);
            }

            agent.post('/api/manage-carts/add')
              .send(product)
              .expect(200)
              .end(function (cartSaveErr, cartSaveRes) {
                // Handle Cart save error
                if (cartSaveErr) {
                  return done(cartSaveErr);
                }
                // Get Carts list
                var carts = cartSaveRes.body;
                // Set assertions
                (carts.user._id).should.equal(userId);
                (carts.products.length).should.match(1);
                (carts.amount).should.match(200);
                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('MDW : should be able add to cart (New have data)', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }
        // Get the userId
        var userId = user.id;
        // Save a new Cart
        agent.post('/api/manage-carts/add')
          .send(product)
          .expect(200)
          .end(function (cartSaveErr, cartSaveRes) {
            // Handle Cart save error
            if (cartSaveErr) {
              return done(cartSaveErr);
            }

            agent.post('/api/manage-carts/add')
              .send(product)
              .expect(200)
              .end(function (cartSaveErr, cartSaveRes) {
                // Handle Cart save error
                if (cartSaveErr) {
                  return done(cartSaveErr);
                }

                agent.post('/api/manage-carts/add')
                  .send(product2)
                  .expect(200)
                  .end(function (cartSaveErr, cartSaveRes) {
                    // Handle Cart save error
                    if (cartSaveErr) {
                      return done(cartSaveErr);
                    }
                    // Get Carts list
                    var carts = cartSaveRes.body;
                    // Set assertions
                    (carts.user._id).should.equal(userId);
                    (carts.products.length).should.match(2);
                    (carts.products[0].qty).should.match(2);
                    (carts.products[1].qty).should.match(1);
                    (carts.amount).should.match(250);
                    // Call the assertion callback
                    done();
                  });
              });
          });
      });
  });

  it('MDW : should be able remove to cart (Duplicate)', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }
        // Get the userId
        var userId = user.id;
        // Save a new Cart
        agent.post('/api/manage-carts/add')
          .send(product2)
          .expect(200)
          .end(function (cartSaveErr, cartSaveRes) {
            // Handle Cart save error
            if (cartSaveErr) {
              return done(cartSaveErr);
            }

            agent.post('/api/manage-carts/add')
              .send(product2)
              .expect(200)
              .end(function (cartSaveErr, cartSaveRes) {
                // Handle Cart save error
                if (cartSaveErr) {
                  return done(cartSaveErr);
                }

                agent.post('/api/manage-carts/add')
                  .send(product)
                  .expect(200)
                  .end(function (cartSaveErr, cartSaveRes) {
                    // Handle Cart save error
                    if (cartSaveErr) {
                      return done(cartSaveErr);
                    }

                    agent.post('/api/manage-carts/add')
                      .send(product2)
                      .expect(200)
                      .end(function (cartSaveErr, cartSaveRes) {
                        // Handle Cart save error
                        if (cartSaveErr) {
                          return done(cartSaveErr);
                        }

                        agent.post('/api/manage-carts/add')
                          .send(product)
                          .expect(200)
                          .end(function (cartSaveErr, cartSaveRes) {
                            // Handle Cart save error
                            if (cartSaveErr) {
                              return done(cartSaveErr);
                            }

                            agent.post('/api/manage-carts/remove')
                              .send(product2)
                              .expect(200)
                              .end(function (cartSaveErr, cartSaveRes) {
                                // Handle Cart save error
                                if (cartSaveErr) {
                                  return done(cartSaveErr);
                                }
                                // Get Carts list
                                var carts = cartSaveRes.body;
                                // Set assertions
                                (carts.user._id).should.equal(userId);
                                (carts.products.length).should.match(2);
                                (carts.products[0].qty).should.match(2);
                                (carts.products[1].qty).should.match(2);
                                (carts.amount).should.match(300);
                                // Call the assertion callback
                                done();
                              });
                          });
                      });
                  });
              });
          });
      });
  });

  it('MDW : should be able delete item to cart', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }
        // Get the userId
        var userId = user.id;
        // Save a new Cart
        agent.post('/api/manage-carts/add')
          .send(product)
          .expect(200)
          .end(function (cartSaveErr, cartSaveRes) {
            // Handle Cart save error
            if (cartSaveErr) {
              return done(cartSaveErr);
            }

            agent.post('/api/manage-carts/add')
              .send(product2)
              .expect(200)
              .end(function (cartSaveErr, cartSaveRes) {
                // Handle Cart save error
                if (cartSaveErr) {
                  return done(cartSaveErr);
                }

                agent.post('/api/manage-carts/add')
                  .send(product)
                  .expect(200)
                  .end(function (cartSaveErr, cartSaveRes) {
                    // Handle Cart save error
                    if (cartSaveErr) {
                      return done(cartSaveErr);
                    }

                    agent.post('/api/manage-carts/add')
                      .send(product2)
                      .expect(200)
                      .end(function (cartSaveErr, cartSaveRes) {
                        // Handle Cart save error
                        if (cartSaveErr) {
                          return done(cartSaveErr);
                        }

                        agent.post('/api/manage-carts/delete')
                          .send(product2)
                          .expect(200)
                          .end(function (cartSaveErr, cartSaveRes) {
                            // Handle Cart save error
                            if (cartSaveErr) {
                              return done(cartSaveErr);
                            }
                            // Get Carts list
                            var carts = cartSaveRes.body;
                            // Set assertions
                            (carts.user._id).should.equal(userId);
                            (carts.products.length).should.match(1);
                            (carts.products[0].qty).should.match(2);
                            (carts.amount).should.match(200);
                            // Call the assertion callback
                            done();
                          });
                      });
                  });
              });
          });
      });
  });

  it('MDW : get cart by user login', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials2)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }
        // Get the userId
        var userId = user2.id;
        // Save a new Cart
        agent.post('/api/manage-carts/add')
          .send(product)
          .expect(200)
          .end(function (cartSaveErr, cartSaveRes) {
            // Handle Cart save error
            if (cartSaveErr) {
              return done(cartSaveErr);
            }

            agent.get('/api/manage-carts/get-by-user/' + userId)
              .end(function (cartSaveErr, cartSaveRes) {
                // Handle Cart save error
                if (cartSaveErr) {
                  return done(cartSaveErr);
                }
                // Get Carts list
                var carts = cartSaveRes.body;
                // Set assertions
                (carts.user._id).should.equal(userId);
                (carts.products.length).should.match(1);
                // Call the assertion callback
                done();
              });
          });
      });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Shop.remove().exec(function () {
        Product.remove().exec(function () {
          Cart.remove().exec(done);
        });
      });
    });
  });
});
