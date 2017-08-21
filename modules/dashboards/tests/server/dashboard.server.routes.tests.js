'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Dashboard = mongoose.model('Dashboard'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  dashboard;

/**
 * Dashboard routes tests
 */
describe('Dashboard CRUD tests', function () {

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

    dashboard = new Dashboard({
      banner_image: "http://www.limstreet.com/wp-content/uploads/2016/04/Nike_Free_Auxetic_Midsole_Technology_for_Running_and_Training_55159.jpg",
      banner_title: "Fashion"
    });

    // Save a user to the test db and create new Dashboard
    user.save(function () {
      dashboard.save(function () {
        done();
      });
    });
    
  });

  it('should return title and banner', function (done) {
    agent.get('/api/dashboards')
      .end(function (req, res) {
        (res.body.banner_image).should.equal(dashboard.banner_image);
        (res.body.banner_title).should.equal(dashboard.banner_title);
        done();
      });
  });

  it('should be able to get lastvisit if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {

        if (signinErr) {
          return done(signinErr);
        }

        agent.get('/api/dashboards')
          .end(function (req, res) {
            (res.body.lastvisit.length).should.equal(0);
            done();
          });
      });
  });

  it('should return popularproducts', function (done) {
    agent.get('/api/dashboards')
      .end(function (req, res) {
        (res.body.popularproducts.length).should.equal(0);
        done();
      });
  });

  it('should return popularshops', function (done) {
    agent.get('/api/dashboards')
      .end(function (req, res) {
        (res.body.popularshops.length).should.equal(0);
        done();
      });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Dashboard.remove().exec(function () {
        done();
      });
    });
  });
});
