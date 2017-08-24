'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Address = mongoose.model('Addressmaster'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  address;

/**
 * Addressbyuser routes tests
 */
describe('Addressbyuser CRUD tests', function () {

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

    // Save a user to the test db and create new Addressbyuser
    user.save(function () {
      address = {
        firstname: 'Addressmaster Name',
        lastname: 'Addressmaster lastname',
        address: 'Addressmaster address',
        postcode: 'Addressmaster postcode',
        subdistrict: 'Addressmaster subdistrict',
        district: 'Addressmaster district',
        province: 'Addressmaster province',
        tel: 'Addressmaster tel',
        user: user
      };

      done();
    });
  });

  it('should be able to get address by user', function (done) {
    var addressObj1 = new Address(address);
    var addressObj2 = new Address(address);
    var addressObj3 = new Address(address);
    addressObj3.user = null;
    addressObj3.save(function () {
      addressObj1.save(function () {
        addressObj2.save(function () {
          agent.get('/api/addressmasters')
            .end(function (addressmastersGetErr, addressmastersGetRes) {
              // Handle Addressbyusers save error
              if (addressmastersGetErr) {
                return done(addressmastersGetErr);
              }

              // Get Addressbyusers list
              var address = addressmastersGetRes.body;

              // Set assertions
              (address.length).should.equal(3);

              // Call the assertion callback
              agent.get('/api/addressbyusers/' + user.id)
                .end(function (addressbyusersGetErr, addressbyusersGetRes) {
                  // Handle Addressbyusers save error
                  if (addressbyusersGetErr) {
                    return done(addressbyusersGetErr);
                  }

                  // Get Addressbyusers list
                  var addressbyusers = addressbyusersGetRes.body;

                  // Set assertions
                  (addressbyusers.length).should.equal(2);

                  // Call the assertion callback
                  done();
                });
            });
        });
      });
    });
    // agent.post('/api/auth/signin')
    //   .send(credentials)
    //   .expect(200)
    //   .end(function (signinErr, signinRes) {
    //     // Handle signin error
    //     if (signinErr) {
    //       return done(signinErr);
    //     }

    //     // Get the userId
    //     var userId = user.id;

    //     // Save a new Addressbyuser
    //     agent.post('/api/addressbyusers')
    //       .send(addressbyuser)
    //       .expect(200)
    //       .end(function (addressbyuserSaveErr, addressbyuserSaveRes) {
    //         // Handle Addressbyuser save error
    //         if (addressbyuserSaveErr) {
    //           return done(addressbyuserSaveErr);
    //         }

    //         // Get a list of Addressbyusers
    //         agent.get('/api/addressbyusers')
    //           .end(function (addressbyusersGetErr, addressbyusersGetRes) {
    //             // Handle Addressbyusers save error
    //             if (addressbyusersGetErr) {
    //               return done(addressbyusersGetErr);
    //             }

    //             // Get Addressbyusers list
    //             var addressbyusers = addressbyusersGetRes.body;

    //             // Set assertions
    //             (addressbyusers[0].user._id).should.equal(userId);
    //             (addressbyusers[0].name).should.match('Addressbyuser name');

    //             // Call the assertion callback
    //             done();
    //           });
    //       });
    //   });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Address.remove().exec(done);
    });
  });
});
