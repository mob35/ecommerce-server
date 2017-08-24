'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Addressmaster = mongoose.model('Addressmaster');

/**
 * Globals
 */
var user,
  addressmaster;

/**
 * Unit tests
 */
describe('Addressmaster Model Unit Tests:', function() {
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
      addressmaster = new Addressmaster({
        firstname: 'Addressmaster Name',
        lastname: 'Addressmaster lastname',
        address: 'Addressmaster address',
        postcode: 'Addressmaster postcode',
        subdistrict: 'Addressmaster subdistrict',
        district: 'Addressmaster district',
        province: 'Addressmaster province',
        tel: 'Addressmaster tel',

        user: user
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      return addressmaster.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without firstname', function(done) {
      addressmaster.firstname = '';

      return addressmaster.save(function(err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without lastname', function(done) {
      addressmaster.lastname = '';

      return addressmaster.save(function(err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without address', function(done) {
      addressmaster.address = '';

      return addressmaster.save(function(err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without postcode', function(done) {
      addressmaster.postcode = '';

      return addressmaster.save(function(err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without subdistrict', function(done) {
      addressmaster.subdistrict = '';

      return addressmaster.save(function(err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without district', function(done) {
      addressmaster.district = '';

      return addressmaster.save(function(err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without province', function(done) {
      addressmaster.province = '';

      return addressmaster.save(function(err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without tel', function(done) {
      addressmaster.tel = '';

      return addressmaster.save(function(err) {
        should.exist(err);
        done();
      });
    });


  });

  afterEach(function(done) {
    Addressmaster.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
