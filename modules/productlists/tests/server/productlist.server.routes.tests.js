'use strict';

var should = require('should'),
    request = require('supertest'),
    path = require('path'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Product = mongoose.model('Product'),
    Shop = mongoose.model('Shop'),
    Shipping = mongoose.model('Shipping'),
    Categorymaster = mongoose.model('Categorymaster'),
    express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
    agent,
    credentials,
    user,
    shop,
    shipping,
    categorymaster,
    product;
// productlist;

/**
 * Productlist routes tests
 */
describe('Productlist CRUD tests', function () {

    before(function (done) {
        // Get application
        app = express.init(mongoose);
        agent = request.agent(app);

        done();
    });

    beforeEach(function (done) {
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
            name: 'Shop name',
            detail: 'Shop detail',
            email: 'Shop email',
            tel: 'Shop tel',
            img: [{
                url: 'img url'
            }],
            map: {
                lat: 'map lat',
                lng: 'map lng'
            },
        });

        shipping = new Shipping({
            name: 'shipping name',
            detail: 'shipping detail',
            days: 10
        });

        categorymaster = new Categorymaster({
            name: 'categorymaster name',
            detail: 'categorymaster detail',
            parent: 'categorymaster parent',
            user: user
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
            }],
            shippings: [{
                shipping: shipping,
                shippingprice: 10,
                shippingstartdate: new Date('2017-08-21'),
                shippingenddate: new Date('2017-08-21')
            }],
            shopseller: shop,
            category: categorymaster
        });

        // Save a user to the test db and create new Productlist
        user.save(function () {
            shop.save(function () {
                shipping.save(function () {
                    categorymaster.save(function () {
                        product.save(function () {
                            done();
                        });
                    });
                });
            });
        });
    });

    it('get product list', function (done) {
        agent.get('/api/productlists')
            .send(product)
            .expect(200)
            .end(function (productlistSaveErr, productlistSaveRes) {
                // Call the assertion callback
                var productlists = productlistSaveRes.body;
                (productlists.product[0].name).should.equal('Product name');
                (productlists.product[0].detail).should.equal('Product detail');
                (productlists.product[0].unitprice).should.equal(100);
                (productlists.product[0].img[0].url).should.equal('img url');

                done();
            });
    });

    afterEach(function (done) {
        User.remove().exec(function () {
            Shop.remove().exec(function () {
                Shipping.remove().exec(function () {
                    Categorymaster.remove().exec(function () {
                        Product.remove().exec(function () {
                            done();
                        });
                    });
                });
            });
        });
    });
});