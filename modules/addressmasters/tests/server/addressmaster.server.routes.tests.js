'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Addressmaster = mongoose.model('Addressmaster'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  addressmaster;

/**
 * Addressmaster routes tests
 */
describe('Addressmaster CRUD tests', function () {

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

    // Save a user to the test db and create new Addressmaster
    user.save(function () {
      addressmaster = {
        firstname: 'Addressmaster Name',
        lastname: 'Addressmaster lastname',
        address: 'Addressmaster address',
        postcode: 'Addressmaster postcode',
        subdistrict: 'Addressmaster subdistrict',
        district: 'Addressmaster district',
        province: 'Addressmaster province',
        tel: 'Addressmaster tel',
      };

      done();
    });
  });

  // it('should be able to save a Addressmaster if logged in', function (done) {
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

  //       // Save a new Addressmaster
  //       agent.post('/api/addressmasters')
  //         .send(addressmaster)
  //         .expect(200)
  //         .end(function (addressmasterSaveErr, addressmasterSaveRes) {
  //           // Handle Addressmaster save error
  //           if (addressmasterSaveErr) {
  //             return done(addressmasterSaveErr);
  //           }

  //           // Get a list of Addressmasters
  //           agent.get('/api/addressmasters')
  //             .end(function (addressmastersGetErr, addressmastersGetRes) {
  //               // Handle Addressmasters save error
  //               if (addressmastersGetErr) {
  //                 return done(addressmastersGetErr);
  //               }

  //               // Get Addressmasters list
  //               var addressmasters = addressmastersGetRes.body;

  //               // Set assertions
  //               (addressmasters[0].user._id).should.equal(userId);
  //               (addressmasters[0].name).should.match('Addressmaster name');

  //               // Call the assertion callback
  //               done();
  //             });
  //         });
  //     });
  // });

  it('should not be able to save an Addressmaster if not logged in', function (done) {
    agent.post('/api/addressmasters')
      .send(addressmaster)
      .expect(403)
      .end(function (addressmasterSaveErr, addressmasterSaveRes) {
        // Call the assertion callback
        done(addressmasterSaveErr);
      });
  });

  // it('should not be able to save an Addressmaster if no name is provided', function (done) {
  //   // Invalidate name field
  //   addressmaster.name = '';

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

  //       // Save a new Addressmaster
  //       agent.post('/api/addressmasters')
  //         .send(addressmaster)
  //         .expect(400)
  //         .end(function (addressmasterSaveErr, addressmasterSaveRes) {
  //           // Set message assertion
  //           (addressmasterSaveRes.body.message).should.match('Please fill Addressmaster name');

  //           // Handle Addressmaster save error
  //           done(addressmasterSaveErr);
  //         });
  //     });
  // });

  // it('should be able to update an Addressmaster if signed in', function (done) {
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

  //       // Save a new Addressmaster
  //       agent.post('/api/addressmasters')
  //         .send(addressmaster)
  //         .expect(200)
  //         .end(function (addressmasterSaveErr, addressmasterSaveRes) {
  //           // Handle Addressmaster save error
  //           if (addressmasterSaveErr) {
  //             return done(addressmasterSaveErr);
  //           }

  //           // Update Addressmaster name
  //           addressmaster.name = 'WHY YOU GOTTA BE SO MEAN?';

  //           // Update an existing Addressmaster
  //           agent.put('/api/addressmasters/' + addressmasterSaveRes.body._id)
  //             .send(addressmaster)
  //             .expect(200)
  //             .end(function (addressmasterUpdateErr, addressmasterUpdateRes) {
  //               // Handle Addressmaster update error
  //               if (addressmasterUpdateErr) {
  //                 return done(addressmasterUpdateErr);
  //               }

  //               // Set assertions
  //               (addressmasterUpdateRes.body._id).should.equal(addressmasterSaveRes.body._id);
  //               (addressmasterUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

  //               // Call the assertion callback
  //               done();
  //             });
  //         });
  //     });
  // });

  it('should be able to get a list of Addressmasters if not signed in', function (done) {
    // Create new Addressmaster model instance
    var addressmasterObj = new Addressmaster(addressmaster);

    // Save the addressmaster
    addressmasterObj.save(function () {
      // Request Addressmasters
      request(app).get('/api/addressmasters')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  // it('should be able to get a single Addressmaster if not signed in', function (done) {
  //   // Create new Addressmaster model instance
  //   var addressmasterObj = new Addressmaster(addressmaster);

  //   // Save the Addressmaster
  //   addressmasterObj.save(function () {
  //     request(app).get('/api/addressmasters/' + addressmasterObj._id)
  //       .end(function (req, res) {
  //         // Set assertion
  //         res.body.should.be.instanceof(Object).and.have.property('name', addressmaster.name);

  //         // Call the assertion callback
  //         done();
  //       });
  //   });
  // });

  it('should return proper error for single Addressmaster with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/addressmasters/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Addressmaster is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Addressmaster which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Addressmaster
    request(app).get('/api/addressmasters/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Addressmaster with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Addressmaster if signed in', function (done) {
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

        // Save a new Addressmaster
        agent.post('/api/addressmasters')
          .send(addressmaster)
          .expect(200)
          .end(function (addressmasterSaveErr, addressmasterSaveRes) {
            // Handle Addressmaster save error
            if (addressmasterSaveErr) {
              return done(addressmasterSaveErr);
            }

            // Delete an existing Addressmaster
            agent.delete('/api/addressmasters/' + addressmasterSaveRes.body._id)
              .send(addressmaster)
              .expect(200)
              .end(function (addressmasterDeleteErr, addressmasterDeleteRes) {
                // Handle addressmaster error error
                if (addressmasterDeleteErr) {
                  return done(addressmasterDeleteErr);
                }

                // Set assertions
                (addressmasterDeleteRes.body._id).should.equal(addressmasterSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Addressmaster if not signed in', function (done) {
    // Set Addressmaster user
    addressmaster.user = user;

    // Create new Addressmaster model instance
    var addressmasterObj = new Addressmaster(addressmaster);

    // Save the Addressmaster
    addressmasterObj.save(function () {
      // Try deleting Addressmaster
      request(app).delete('/api/addressmasters/' + addressmasterObj._id)
        .expect(403)
        .end(function (addressmasterDeleteErr, addressmasterDeleteRes) {
          // Set message assertion
          (addressmasterDeleteRes.body.message).should.match('User is not authorized');

          // Handle Addressmaster error error
          done(addressmasterDeleteErr);
        });

    });
  });

  // it('should be able to get a single Addressmaster that has an orphaned user reference', function (done) {
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

  //         // Save a new Addressmaster
  //         agent.post('/api/addressmasters')
  //           .send(addressmaster)
  //           .expect(200)
  //           .end(function (addressmasterSaveErr, addressmasterSaveRes) {
  //             // Handle Addressmaster save error
  //             if (addressmasterSaveErr) {
  //               return done(addressmasterSaveErr);
  //             }

  //             // Set assertions on new Addressmaster
  //             (addressmasterSaveRes.body.name).should.equal(addressmaster.name);
  //             should.exist(addressmasterSaveRes.body.user);
  //             should.equal(addressmasterSaveRes.body.user._id, orphanId);

  //             // force the Addressmaster to have an orphaned user reference
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

  //                   // Get the Addressmaster
  //                   agent.get('/api/addressmasters/' + addressmasterSaveRes.body._id)
  //                     .expect(200)
  //                     .end(function (addressmasterInfoErr, addressmasterInfoRes) {
  //                       // Handle Addressmaster error
  //                       if (addressmasterInfoErr) {
  //                         return done(addressmasterInfoErr);
  //                       }

  //                       // Set assertions
  //                       (addressmasterInfoRes.body._id).should.equal(addressmasterSaveRes.body._id);
  //                       (addressmasterInfoRes.body.name).should.equal(addressmaster.name);
  //                       should.equal(addressmasterInfoRes.body.user, undefined);

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
      Addressmaster.remove().exec(done);
    });
  });
});
