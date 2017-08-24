'use strict';

var should = require('should'),
    request = require('supertest'),
    path = require('path'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Paymentmaster = mongoose.model('Paymentmaster'),
    express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
    agent,
    credentials,
    user,
    paymentmaster2,
    paymentmaster3,
    paymentmaster4,
    paymentmaster;

/**
 * Paymentmaster routes tests
 */
describe('Paymentmaster CRUD tests', function () {

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

        paymentmaster2 = new Paymentmaster({
            name: 'Credit Card',
            detail: 'Paymentmaster detail',
            img: {
                url: 'Paymentmaster imgUrl'
            }
        });
        paymentmaster3 = new Paymentmaster({
            name: 'Delivery',
            detail: 'Paymentmaster detail',
            img: {
                url: 'Paymentmaster imgUrl'
            }
        });
        paymentmaster4 = new Paymentmaster({
            name: 'Counter Service',
            detail: 'Paymentmaster detail',
            img: {
                url: 'Paymentmaster imgUrl'
            }
        });

        // Save a user to the test db and create new Paymentmaster
        user.save(function () {
            paymentmaster2.save(function () {
                paymentmaster3.save(function () {
                    paymentmaster4.save(function () {
                        paymentmaster = {
                            name: 'Paymentmaster name',
                            detail: 'Paymentmaster detail',
                            img: {
                                url: 'Paymentmaster imgUrl'
                            }
                        };

                        done();
                    });
                });
            });
        });
    });

    it('should be able to save a Paymentmaster if logged in', function (done) {
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

                // Save a new Paymentmaster
                agent.post('/api/paymentmasters')
                    .send(paymentmaster)
                    .expect(200)
                    .end(function (paymentmasterSaveErr, paymentmasterSaveRes) {
                        // Handle Paymentmaster save error
                        if (paymentmasterSaveErr) {
                            return done(paymentmasterSaveErr);
                        }

                        // Get a list of Paymentmasters
                        agent.get('/api/paymentmasters')
                            .end(function (paymentmastersGetErr, paymentmastersGetRes) {
                                // Handle Paymentmasters save error
                                if (paymentmastersGetErr) {
                                    return done(paymentmastersGetErr);
                                }

                                // Get Paymentmasters list
                                var paymentmasters = paymentmastersGetRes.body;

                                // Set assertions
                                (paymentmasters[0].user._id).should.equal(userId);
                                (paymentmasters[0].name).should.match('Paymentmaster name');
                                (paymentmasters[0].detail).should.match('Paymentmaster detail');
                                (paymentmasters[0].img.url).should.match('Paymentmaster imgUrl');

                                // Call the assertion callback
                                done();
                            });
                    });
            });
    });

    it('should not be able to save an Paymentmaster if not logged in', function (done) {
        agent.post('/api/paymentmasters')
            .send(paymentmaster)
            .expect(403)
            .end(function (paymentmasterSaveErr, paymentmasterSaveRes) {
                // Call the assertion callback
                done(paymentmasterSaveErr);
            });
    });

    it('should not be able to save an Paymentmaster if no name is provided', function (done) {
        // Invalidate name field
        paymentmaster.name = '';

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

                // Save a new Paymentmaster
                agent.post('/api/paymentmasters')
                    .send(paymentmaster)
                    .expect(400)
                    .end(function (paymentmasterSaveErr, paymentmasterSaveRes) {
                        // Set message assertion
                        (paymentmasterSaveRes.body.message).should.match('Please fill Paymentmaster name');

                        // Handle Paymentmaster save error
                        done(paymentmasterSaveErr);
                    });
            });
    });

    it('should be able to update an Paymentmaster if signed in', function (done) {
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

                // Save a new Paymentmaster
                agent.post('/api/paymentmasters')
                    .send(paymentmaster)
                    .expect(200)
                    .end(function (paymentmasterSaveErr, paymentmasterSaveRes) {
                        // Handle Paymentmaster save error
                        if (paymentmasterSaveErr) {
                            return done(paymentmasterSaveErr);
                        }

                        // Update Paymentmaster name
                        paymentmaster.name = 'WHY YOU GOTTA BE SO MEAN?';

                        // Update an existing Paymentmaster
                        agent.put('/api/paymentmasters/' + paymentmasterSaveRes.body._id)
                            .send(paymentmaster)
                            .expect(200)
                            .end(function (paymentmasterUpdateErr, paymentmasterUpdateRes) {
                                // Handle Paymentmaster update error
                                if (paymentmasterUpdateErr) {
                                    return done(paymentmasterUpdateErr);
                                }

                                // Set assertions
                                (paymentmasterUpdateRes.body._id).should.equal(paymentmasterSaveRes.body._id);
                                (paymentmasterUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                                // Call the assertion callback
                                done();
                            });
                    });
            });
    });

    it('should be able to get a list of Paymentmasters if not signed in', function (done) {
        // Create new Paymentmaster model instance
        var paymentmasterObj = new Paymentmaster(paymentmaster);

        // Save the paymentmaster
        paymentmasterObj.save(function () {
            // Request Paymentmasters
            request(app).get('/api/paymentmasters')
                .end(function (req, res) {
                    // Set assertion
                    res.body.should.be.instanceof(Array).and.have.lengthOf(4);

                    // Call the assertion callback
                    done();
                });

        });
    });

    it('should be able to get a single Paymentmaster if not signed in', function (done) {
        // Create new Paymentmaster model instance
        var paymentmasterObj = new Paymentmaster(paymentmaster);

        // Save the Paymentmaster
        paymentmasterObj.save(function () {
            request(app).get('/api/paymentmasters/' + paymentmasterObj._id)
                .end(function (req, res) {
                    // Set assertion
                    res.body.should.be.instanceof(Object).and.have.property('name', paymentmaster.name);

                    // Call the assertion callback
                    done();
                });
        });
    });

    it('should return proper error for single Paymentmaster with an invalid Id, if not signed in', function (done) {
        // test is not a valid mongoose Id
        request(app).get('/api/paymentmasters/test')
            .end(function (req, res) {
                // Set assertion
                res.body.should.be.instanceof(Object).and.have.property('message', 'Paymentmaster is invalid');

                // Call the assertion callback
                done();
            });
    });

    it('should return proper error for single Paymentmaster which doesnt exist, if not signed in', function (done) {
        // This is a valid mongoose Id but a non-existent Paymentmaster
        request(app).get('/api/paymentmasters/559e9cd815f80b4c256a8f41')
            .end(function (req, res) {
                // Set assertion
                res.body.should.be.instanceof(Object).and.have.property('message', 'No Paymentmaster with that identifier has been found');

                // Call the assertion callback
                done();
            });
    });

    it('should be able to delete an Paymentmaster if signed in', function (done) {
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

                // Save a new Paymentmaster
                agent.post('/api/paymentmasters')
                    .send(paymentmaster)
                    .expect(200)
                    .end(function (paymentmasterSaveErr, paymentmasterSaveRes) {
                        // Handle Paymentmaster save error
                        if (paymentmasterSaveErr) {
                            return done(paymentmasterSaveErr);
                        }

                        // Delete an existing Paymentmaster
                        agent.delete('/api/paymentmasters/' + paymentmasterSaveRes.body._id)
                            .send(paymentmaster)
                            .expect(200)
                            .end(function (paymentmasterDeleteErr, paymentmasterDeleteRes) {
                                // Handle paymentmaster error error
                                if (paymentmasterDeleteErr) {
                                    return done(paymentmasterDeleteErr);
                                }

                                // Set assertions
                                (paymentmasterDeleteRes.body._id).should.equal(paymentmasterSaveRes.body._id);

                                // Call the assertion callback
                                done();
                            });
                    });
            });
    });

    it('should not be able to delete an Paymentmaster if not signed in', function (done) {
        // Set Paymentmaster user
        paymentmaster.user = user;

        // Create new Paymentmaster model instance
        var paymentmasterObj = new Paymentmaster(paymentmaster);

        // Save the Paymentmaster
        paymentmasterObj.save(function () {
            // Try deleting Paymentmaster
            request(app).delete('/api/paymentmasters/' + paymentmasterObj._id)
                .expect(403)
                .end(function (paymentmasterDeleteErr, paymentmasterDeleteRes) {
                    // Set message assertion
                    (paymentmasterDeleteRes.body.message).should.match('User is not authorized');

                    // Handle Paymentmaster error error
                    done(paymentmasterDeleteErr);
                });

        });
    });

    it('should be able to get a single Paymentmaster that has an orphaned user reference', function (done) {
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

                    // Save a new Paymentmaster
                    agent.post('/api/paymentmasters')
                        .send(paymentmaster)
                        .expect(200)
                        .end(function (paymentmasterSaveErr, paymentmasterSaveRes) {
                            // Handle Paymentmaster save error
                            if (paymentmasterSaveErr) {
                                return done(paymentmasterSaveErr);
                            }

                            // Set assertions on new Paymentmaster
                            (paymentmasterSaveRes.body.name).should.equal(paymentmaster.name);
                            should.exist(paymentmasterSaveRes.body.user);
                            should.equal(paymentmasterSaveRes.body.user._id, orphanId);

                            // force the Paymentmaster to have an orphaned user reference
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

                                        // Get the Paymentmaster
                                        agent.get('/api/paymentmasters/' + paymentmasterSaveRes.body._id)
                                            .expect(200)
                                            .end(function (paymentmasterInfoErr, paymentmasterInfoRes) {
                                                // Handle Paymentmaster error
                                                if (paymentmasterInfoErr) {
                                                    return done(paymentmasterInfoErr);
                                                }

                                                // Set assertions
                                                (paymentmasterInfoRes.body._id).should.equal(paymentmasterSaveRes.body._id);
                                                (paymentmasterInfoRes.body.name).should.equal(paymentmaster.name);
                                                should.equal(paymentmasterInfoRes.body.user, undefined);

                                                // Call the assertion callback
                                                done();
                                            });
                                    });
                            });
                        });
                });
        });
    });

    afterEach(function (done) {
        User.remove().exec(function () {
            Paymentmaster.remove().exec(done);
        });
    });
});