'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Shop = mongoose.model('Shop'),
  Addressmaster = mongoose.model('Addressmaster'),
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
      address: {
        firstname: 'Full',
        lastname: 'Name',
        address: 'address',
        postcode: 'postcode',
        subdistrict: 'subdistrict',
        province: 'province',
        district: 'district',
        tel: 'tel'
      },
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
        (userShop.shop.address.length).should.equal(1);
        agent.get('/api/addressmasters/' + userShop.shop.address[0].address)
          .end(function (shopErr, shopRes) {
            if (shopErr) {
              return done(shopErr);
            }
            var shop = shopRes.body;

            (shop.user._id).should.equal(userShop.user._id);
            (shop.address).should.equal('address');
            done();
          });
      });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Shop.remove().exec(function () {
        Addressmaster.remove().exec(done);
      });
    });
  });
});
