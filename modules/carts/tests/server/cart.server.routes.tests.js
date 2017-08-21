'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Cart = mongoose.model('Cart'),
  Product = mongoose.model('Product'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  cart,
  product;

/**
 * Cart routes tests
 */
describe('Cart CRUD tests', function () {

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

    // Save a user to the test db and create new Cart
    user.save(function () {
      product.save(function () {
        cart = {
          products: [{
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

  it('should be able to save a Cart if logged in', function (done) {
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
        agent.post('/api/carts')
          .send(cart)
          .expect(200)
          .end(function (cartSaveErr, cartSaveRes) {
            // Handle Cart save error
            if (cartSaveErr) {
              return done(cartSaveErr);
            }

            // Get a list of Carts
            agent.get('/api/carts')
              .end(function (cartsGetErr, cartsGetRes) {
                // Handle Carts save error
                if (cartsGetErr) {
                  return done(cartsGetErr);
                }

                // Get Carts list
                var carts = cartsGetRes.body;

                // Set assertions
                (carts[0].user._id).should.equal(userId);
                (carts[0].amount).should.match(100);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Cart if not logged in', function (done) {
    agent.post('/api/carts')
      .send(cart)
      .expect(403)
      .end(function (cartSaveErr, cartSaveRes) {
        // Call the assertion callback
        done(cartSaveErr);
      });
  });

  it('should not be able to save an Cart if no products is provided', function (done) {
    // Invalidate name field
    cart.products = [];

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
        agent.post('/api/carts')
          .send(cart)
          .expect(400)
          .end(function (cartSaveErr, cartSaveRes) {
            // Set message assertion
            (cartSaveRes.body.message).should.match('Please fill Cart items');

            // Handle Cart save error
            done(cartSaveErr);
          });
      });
  });

  it('should be able to update an Cart if signed in', function (done) {
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
        agent.post('/api/carts')
          .send(cart)
          .expect(200)
          .end(function (cartSaveErr, cartSaveRes) {
            // Handle Cart save error
            if (cartSaveErr) {
              return done(cartSaveErr);
            }

            // Update Cart name
            cart.products[0].qty = 2;

            // Update an existing Cart
            agent.put('/api/carts/' + cartSaveRes.body._id)
              .send(cart)
              .expect(200)
              .end(function (cartUpdateErr, cartUpdateRes) {
                // Handle Cart update error
                if (cartUpdateErr) {
                  return done(cartUpdateErr);
                }

                // Set assertions
                (cartUpdateRes.body._id).should.equal(cartSaveRes.body._id);
                (cartUpdateRes.body.products[0].qty).should.match(2);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Carts if not signed in', function (done) {
    // Create new Cart model instance
    var cartObj = new Cart(cart);

    // Save the cart
    cartObj.save(function () {
      // Request Carts
      request(app).get('/api/carts')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Cart if not signed in', function (done) {
    // Create new Cart model instance
    var cartObj = new Cart(cart);

    // Save the Cart
    cartObj.save(function () {
      request(app).get('/api/carts/' + cartObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('amount', cart.amount);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Cart with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/carts/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Cart is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Cart which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Cart
    request(app).get('/api/carts/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Cart with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Cart if signed in', function (done) {
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
        agent.post('/api/carts')
          .send(cart)
          .expect(200)
          .end(function (cartSaveErr, cartSaveRes) {
            // Handle Cart save error
            if (cartSaveErr) {
              return done(cartSaveErr);
            }

            // Delete an existing Cart
            agent.delete('/api/carts/' + cartSaveRes.body._id)
              .send(cart)
              .expect(200)
              .end(function (cartDeleteErr, cartDeleteRes) {
                // Handle cart error error
                if (cartDeleteErr) {
                  return done(cartDeleteErr);
                }

                // Set assertions
                (cartDeleteRes.body._id).should.equal(cartSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Cart if not signed in', function (done) {
    // Set Cart user
    cart.user = user;

    // Create new Cart model instance
    var cartObj = new Cart(cart);

    // Save the Cart
    cartObj.save(function () {
      // Try deleting Cart
      request(app).delete('/api/carts/' + cartObj._id)
        .expect(403)
        .end(function (cartDeleteErr, cartDeleteRes) {
          // Set message assertion
          (cartDeleteRes.body.message).should.match('User is not authorized');

          // Handle Cart error error
          done(cartDeleteErr);
        });

    });
  });

  it('should be able to get a single Cart that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Cart
          agent.post('/api/carts')
            .send(cart)
            .expect(200)
            .end(function (cartSaveErr, cartSaveRes) {
              // Handle Cart save error
              if (cartSaveErr) {
                return done(cartSaveErr);
              }

              // Set assertions on new Cart
              (cartSaveRes.body.amount).should.equal(cart.amount);
              should.exist(cartSaveRes.body.user);
              should.equal(cartSaveRes.body.user._id, orphanId);

              // force the Cart to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Cart
                    agent.get('/api/carts/' + cartSaveRes.body._id)
                      .expect(200)
                      .end(function (cartInfoErr, cartInfoRes) {
                        // Handle Cart error
                        if (cartInfoErr) {
                          return done(cartInfoErr);
                        }

                        // Set assertions
                        (cartInfoRes.body._id).should.equal(cartSaveRes.body._id);
                        (cartInfoRes.body.amount).should.equal(cart.amount);
                        should.equal(cartInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  it('MDW : should be able add to cart (New)', function (done) {
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
        agent.post('/api/add/cart')
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

  // it('MDW : should be able add to cart (Duplicate)', function (done) {
  //   agent.post('/api/auth/signin')
  //     .send(credentials)
  //     .expect(200)
  //     .end(function (signinErr, signinRes) {
  //       // Handle signin error
  //       if (signinErr) {
  //         return done(signinErr);
  //       }
  //       // Get the userId
  //       var userId = user.id;
  //       // Save a new Cart
  //       agent.post('/api/add/cart')
  //         .send(product)
  //         .expect(200)
  //         .end(function (cartSaveErr, cartSaveRes) {
  //           // Handle Cart save error
  //           if (cartSaveErr) {
  //             return done(cartSaveErr);
  //           }

  //           agent.post('/api/add/cart')
  //             .send(product)
  //             .expect(200)
  //             .end(function (cartSaveErr, cartSaveRes) {
  //               // Handle Cart save error
  //               if (cartSaveErr) {
  //                 return done(cartSaveErr);
  //               }
  //               // Get Carts list
  //               var carts = cartSaveRes.body;
  //               // Set assertions
  //               (carts.user._id).should.equal(userId);
  //               (carts.products.length).should.match(2);
  //               (carts.amount).should.match(200);
  //               // Call the assertion callback
  //               done();
  //             });
  //         });
  //     });
  // });

  afterEach(function (done) {
    User.remove().exec(function () {
      Cart.remove().exec(done);
    });
  });
});
