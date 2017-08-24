'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Paymentmaster = mongoose.model('Paymentmaster');

/**
 * Globals
 */
var user,
    paymentmaster;

/**
 * Unit tests
 */
describe('Paymentmaster Model Unit Tests:', function() {
    beforeEach(function(done) {
        user = new User({
            firstName: 'Full',
            lastName: 'Name',
            displayName: 'Full Name',
            email: 'test@test.com',
            username: 'username',
            password: 'password'
        });

        user.save(function() {
            paymentmaster = new Paymentmaster({
                name: 'Paymentmaster Name',
                detail: 'Paymentmaster Detail',
                img: {
                    url: 'Paymentmaster ImgUrl'
                },
                user: user
            });

            done();
        });
    });

    describe('Method Save', function() {
        it('should be able to save without problems', function(done) {
            this.timeout(0);
            return paymentmaster.save(function(err) {
                should.not.exist(err);
                done();
            });
        });

        it('should be able to show an error when try to save without name', function(done) {
            paymentmaster.name = '';

            return paymentmaster.save(function(err) {
                should.exist(err);
                done();
            });
        });
        it('should be able to show an error when try to save without datail', function(done) {
            paymentmaster.detail = '';

            return paymentmaster.save(function(err) {
                should.exist(err);
                done();
            });
        });
        it('should be able to show an error when try to save without img url', function(done) {
            paymentmaster.img = {
                url: ''
            };

            return paymentmaster.save(function(err) {
                should.exist(err);
                done();
            });
        });
    });

    afterEach(function(done) {
        Paymentmaster.remove().exec(function() {
            User.remove().exec(function() {
                done();
            });
        });
    });
});