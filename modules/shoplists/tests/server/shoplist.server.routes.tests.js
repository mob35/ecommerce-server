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
  shop,
  credentials,
  user;

/**
 * Shoplist routes tests
 */
describe('Shoplist CRUD tests', function () {

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
    // Save a user to the test db and create new Shoplist
    user.save(function () {
      shop.save(function () {
        done();
      });

    });
  });

  it('get shop list', function (done) {
    agent.get('/api/shoplists')
      .send(shop)
      .expect(200)
      .end(function (signinErr, signinRes) {

        var shoplists = signinRes.body;
        (shoplists.shop[0].name).should.equal('Shop Name');
        done();

      });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Shop.remove().exec(done);
    });
  });
});
