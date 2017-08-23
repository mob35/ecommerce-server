'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Shop = mongoose.model('Shop'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  shop;

/**
 * Manage user shop routes tests
 */
describe('Manage user shop CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'admin',
      password: 'P@ssw0rd1234'
    };

    // Create a new user
    user = {
      firstName: 'Full',
      lastName: 'Name',
      // displayName: 'Full Name',
      email: 'test@test.com',
      shop: { name: 'cyber shop' },
      username: credentials.username,
      password: credentials.password,
      provider: 'local',
      tel: '0944440044',
      roles: ['seller']
    };


    // Save a user to the test db and create new Manage user shop
    // user.save(function () {
    //   shop.user = user._id;
    //   shop.save(function () { 
    //     done();
    //   });
    // });
    done();
  });

  it('MDW-User-Shop : should be save user with shop information', function (done) {

    agent.post('/api/manage-user-shops')
      .send(user)
      .expect(200)
      .end(function (saveErr, saveRes) {
        if (saveErr) {
          return done(saveErr);
        }
        var userShop = saveRes.body;

        (userShop.user.username).should.equal(user.username);
        (userShop.shop.name).should.equal('cyber shop');
        done();

        // agent.get('/api/users/' + user.id)
        //   .end(function (signinErr, signinRes) {
        //     // Handle signin error
        //     if (signinErr) {
        //       return done(signinErr);
        //     }

        //     (signinRes.body._id).should.equal(user.id);
        //     agent.get('/api/shops')
        //       .end(function (shopErr, shopRes) {
        //         // Handle signin error
        //         if (shopErr) {
        //           return done(shopErr);
        //         }

        //         (shopRes.body.lenght).should.equal(1);
        //         done();

        //       });

        //   });
      });
  });

  // it('should be able to save a Manage user shop if logged in', function (done) {
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

  //       // Save a new Manage user shop
  //       agent.post('/api/manageUserShops')
  //         .send(manageUserShop)
  //         .expect(200)
  //         .end(function (manageUserShopSaveErr, manageUserShopSaveRes) {
  //           // Handle Manage user shop save error
  //           if (manageUserShopSaveErr) {
  //             return done(manageUserShopSaveErr);
  //           }

  //           // Get a list of Manage user shops
  //           agent.get('/api/manageUserShops')
  //             .end(function (manageUserShopsGetErr, manageUserShopsGetRes) {
  //               // Handle Manage user shops save error
  //               if (manageUserShopsGetErr) {
  //                 return done(manageUserShopsGetErr);
  //               }

  //               // Get Manage user shops list
  //               var manageUserShops = manageUserShopsGetRes.body;

  //               // Set assertions
  //               (manageUserShops[0].user._id).should.equal(userId);
  //               (manageUserShops[0].name).should.match('Manage user shop name');

  //               // Call the assertion callback
  //               done();
  //             });
  //         });
  //     });
  // });

  // it('should not be able to save an Manage user shop if not logged in', function (done) {
  //   agent.post('/api/manageUserShops')
  //     .send(manageUserShop)
  //     .expect(403)
  //     .end(function (manageUserShopSaveErr, manageUserShopSaveRes) {
  //       // Call the assertion callback
  //       done(manageUserShopSaveErr);
  //     });
  // });

  // it('should not be able to save an Manage user shop if no name is provided', function (done) {
  //   // Invalidate name field
  //   manageUserShop.name = '';

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

  //       // Save a new Manage user shop
  //       agent.post('/api/manageUserShops')
  //         .send(manageUserShop)
  //         .expect(400)
  //         .end(function (manageUserShopSaveErr, manageUserShopSaveRes) {
  //           // Set message assertion
  //           (manageUserShopSaveRes.body.message).should.match('Please fill Manage user shop name');

  //           // Handle Manage user shop save error
  //           done(manageUserShopSaveErr);
  //         });
  //     });
  // });

  // it('should be able to update an Manage user shop if signed in', function (done) {
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

  //       // Save a new Manage user shop
  //       agent.post('/api/manageUserShops')
  //         .send(manageUserShop)
  //         .expect(200)
  //         .end(function (manageUserShopSaveErr, manageUserShopSaveRes) {
  //           // Handle Manage user shop save error
  //           if (manageUserShopSaveErr) {
  //             return done(manageUserShopSaveErr);
  //           }

  //           // Update Manage user shop name
  //           manageUserShop.name = 'WHY YOU GOTTA BE SO MEAN?';

  //           // Update an existing Manage user shop
  //           agent.put('/api/manageUserShops/' + manageUserShopSaveRes.body._id)
  //             .send(manageUserShop)
  //             .expect(200)
  //             .end(function (manageUserShopUpdateErr, manageUserShopUpdateRes) {
  //               // Handle Manage user shop update error
  //               if (manageUserShopUpdateErr) {
  //                 return done(manageUserShopUpdateErr);
  //               }

  //               // Set assertions
  //               (manageUserShopUpdateRes.body._id).should.equal(manageUserShopSaveRes.body._id);
  //               (manageUserShopUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

  //               // Call the assertion callback
  //               done();
  //             });
  //         });
  //     });
  // });

  // it('should be able to get a list of Manage user shops if not signed in', function (done) {
  //   // Create new Manage user shop model instance
  //   var manageUserShopObj = new ManageUserShop(manageUserShop);

  //   // Save the manageUserShop
  //   manageUserShopObj.save(function () {
  //     // Request Manage user shops
  //     request(app).get('/api/manageUserShops')
  //       .end(function (req, res) {
  //         // Set assertion
  //         res.body.should.be.instanceof(Array).and.have.lengthOf(1);

  //         // Call the assertion callback
  //         done();
  //       });

  //   });
  // });

  // it('should be able to get a single Manage user shop if not signed in', function (done) {
  //   // Create new Manage user shop model instance
  //   var manageUserShopObj = new ManageUserShop(manageUserShop);

  //   // Save the Manage user shop
  //   manageUserShopObj.save(function () {
  //     request(app).get('/api/manageUserShops/' + manageUserShopObj._id)
  //       .end(function (req, res) {
  //         // Set assertion
  //         res.body.should.be.instanceof(Object).and.have.property('name', manageUserShop.name);

  //         // Call the assertion callback
  //         done();
  //       });
  //   });
  // });

  // it('should return proper error for single Manage user shop with an invalid Id, if not signed in', function (done) {
  //   // test is not a valid mongoose Id
  //   request(app).get('/api/manageUserShops/test')
  //     .end(function (req, res) {
  //       // Set assertion
  //       res.body.should.be.instanceof(Object).and.have.property('message', 'Manage user shop is invalid');

  //       // Call the assertion callback
  //       done();
  //     });
  // });

  // it('should return proper error for single Manage user shop which doesnt exist, if not signed in', function (done) {
  //   // This is a valid mongoose Id but a non-existent Manage user shop
  //   request(app).get('/api/manageUserShops/559e9cd815f80b4c256a8f41')
  //     .end(function (req, res) {
  //       // Set assertion
  //       res.body.should.be.instanceof(Object).and.have.property('message', 'No Manage user shop with that identifier has been found');

  //       // Call the assertion callback
  //       done();
  //     });
  // });

  // it('should be able to delete an Manage user shop if signed in', function (done) {
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

  //       // Save a new Manage user shop
  //       agent.post('/api/manageUserShops')
  //         .send(manageUserShop)
  //         .expect(200)
  //         .end(function (manageUserShopSaveErr, manageUserShopSaveRes) {
  //           // Handle Manage user shop save error
  //           if (manageUserShopSaveErr) {
  //             return done(manageUserShopSaveErr);
  //           }

  //           // Delete an existing Manage user shop
  //           agent.delete('/api/manageUserShops/' + manageUserShopSaveRes.body._id)
  //             .send(manageUserShop)
  //             .expect(200)
  //             .end(function (manageUserShopDeleteErr, manageUserShopDeleteRes) {
  //               // Handle manageUserShop error error
  //               if (manageUserShopDeleteErr) {
  //                 return done(manageUserShopDeleteErr);
  //               }

  //               // Set assertions
  //               (manageUserShopDeleteRes.body._id).should.equal(manageUserShopSaveRes.body._id);

  //               // Call the assertion callback
  //               done();
  //             });
  //         });
  //     });
  // });

  // it('should not be able to delete an Manage user shop if not signed in', function (done) {
  //   // Set Manage user shop user
  //   manageUserShop.user = user;

  //   // Create new Manage user shop model instance
  //   var manageUserShopObj = new ManageUserShop(manageUserShop);

  //   // Save the Manage user shop
  //   manageUserShopObj.save(function () {
  //     // Try deleting Manage user shop
  //     request(app).delete('/api/manageUserShops/' + manageUserShopObj._id)
  //       .expect(403)
  //       .end(function (manageUserShopDeleteErr, manageUserShopDeleteRes) {
  //         // Set message assertion
  //         (manageUserShopDeleteRes.body.message).should.match('User is not authorized');

  //         // Handle Manage user shop error error
  //         done(manageUserShopDeleteErr);
  //       });

  //   });
  // });

  // it('should be able to get a single Manage user shop that has an orphaned user reference', function (done) {
  //   // Create orphan user creds
  //   var _creds = {
  //     username: 'orphan',
  //     password: 'M3@n.jsI$Aw3$0m3'
  //   };

  //   // Create orphan user
  //   var _orphan = new User({
  //     firstName: 'Full',
  //     lastName: 'Name',
  //     displayName: 'Full Name',
  //     email: 'orphan@test.com',
  //     username: _creds.username,
  //     password: _creds.password,
  //     provider: 'local'
  //   });

  //   _orphan.save(function (err, orphan) {
  //     // Handle save error
  //     if (err) {
  //       return done(err);
  //     }

  //     agent.post('/api/auth/signin')
  //       .send(_creds)
  //       .expect(200)
  //       .end(function (signinErr, signinRes) {
  //         // Handle signin error
  //         if (signinErr) {
  //           return done(signinErr);
  //         }

  //         // Get the userId
  //         var orphanId = orphan._id;

  //         // Save a new Manage user shop
  //         agent.post('/api/manageUserShops')
  //           .send(manageUserShop)
  //           .expect(200)
  //           .end(function (manageUserShopSaveErr, manageUserShopSaveRes) {
  //             // Handle Manage user shop save error
  //             if (manageUserShopSaveErr) {
  //               return done(manageUserShopSaveErr);
  //             }

  //             // Set assertions on new Manage user shop
  //             (manageUserShopSaveRes.body.name).should.equal(manageUserShop.name);
  //             should.exist(manageUserShopSaveRes.body.user);
  //             should.equal(manageUserShopSaveRes.body.user._id, orphanId);

  //             // force the Manage user shop to have an orphaned user reference
  //             orphan.remove(function () {
  //               // now signin with valid user
  //               agent.post('/api/auth/signin')
  //                 .send(credentials)
  //                 .expect(200)
  //                 .end(function (err, res) {
  //                   // Handle signin error
  //                   if (err) {
  //                     return done(err);
  //                   }

  //                   // Get the Manage user shop
  //                   agent.get('/api/manageUserShops/' + manageUserShopSaveRes.body._id)
  //                     .expect(200)
  //                     .end(function (manageUserShopInfoErr, manageUserShopInfoRes) {
  //                       // Handle Manage user shop error
  //                       if (manageUserShopInfoErr) {
  //                         return done(manageUserShopInfoErr);
  //                       }

  //                       // Set assertions
  //                       (manageUserShopInfoRes.body._id).should.equal(manageUserShopSaveRes.body._id);
  //                       (manageUserShopInfoRes.body.name).should.equal(manageUserShop.name);
  //                       should.equal(manageUserShopInfoRes.body.user, undefined);

  //                       // Call the assertion callback
  //                       done();
  //                     });
  //                 });
  //             });
  //           });
  //       });
  //   });
  // });

  afterEach(function (done) {
    User.remove().exec(function () {
      done();
      // Shop.remove().exec(done);
    });
  });
});
