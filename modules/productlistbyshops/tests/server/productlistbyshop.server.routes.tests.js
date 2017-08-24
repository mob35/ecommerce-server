'use strict';

var should = require('should'),
    request = require('supertest'),
    path = require('path'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Product = mongoose.model('Product'),
    Shop = mongoose.model('Shop'),
    Shipping = mongoose.model('Shipping'),
    Sizemaster = mongoose.model('Sizemaster'),
    express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
    agent,
    credentials,
    shop,
    shop2,
    shipping,
    product,
    sizemaster,
    user;

/**
 * Productlistbyshop routes tests
 */
describe('Productlistbyshop CRUD tests', function () {

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

        shop2 = new Shop({
            name: 'Shop name2',
            detail: 'Shop detail2',
            email: 'Shop email2',
            tel: 'Shop tel2',
            img: [{
                url: 'img url2'
            }],
            map: {
                lat: 'map lat2',
                lng: 'map lng2'
            },
        });

        shipping = new Shipping({
            name: 'shipping name',
            detail: 'shipping detail',
            days: 10
        });

        sizemaster = new Sizemaster({
            detail: 'US',
            sizedetail: [{
                name: '38'
            }, {
                name: '39'
            }]
        });

        product = new Product({
            name: 'Product name',
            detail: 'Product detail',
            unitprice: 100,
            qty: 10,
            img: [{
                url: 'imgurl',
                id: 'imgid'
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
            issize: true,
            size: sizemaster
        });

        // Save a user to the test db and create new Productlistbyshop
        user.save(function () {
            shop.save(function () {
                shop2.save(function () {
                    sizemaster.save(function () {
                        shipping.save(function () {
                            product = {
                                name: 'Product name',
                                detail: 'Product detail',
                                unitprice: 100,
                                qty: 10,
                                img: [{
                                    url: 'imgurl',
                                    id: 'imgid'
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
                                issize: true,
                                size: sizemaster
                            };
                            // product.save(function() {
                            done();
                            // });
                        });
                    });
                });
            });
        });
    });

    it('get shop by id not id', function (done) {

        // Get a list of Products
        agent.get('/api/productlistbyshop/ ')
            .expect(404)
            .end(function (productlistSaveErr, productlistSaveRes) {
                // Call the assertion callback
                done(productlistSaveErr);
            });
        // done();
    });

    it('get shop by id', function (done) {

        // Create new Product model instance
        var productObj = new Product({
            name: 'Product name',
            detail: 'Product detail',
            unitprice: 100,
            qty: 10,
            img: [{
                url: 'imgurl',
                id: 'imgid'
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
            issize: true,
            size: sizemaster
        });
        var productObj2 = new Product({
            name: 'Product name',
            detail: 'Product detail',
            unitprice: 100,
            qty: 10,
            img: [{
                url: 'imgurl',
                id: 'imgid'
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
            issize: true,
            size: sizemaster
        });
        var productObj3 = new Product({
            name: 'Product name',
            detail: 'Product detail',
            unitprice: 100,
            qty: 10,
            img: [{
                url: 'imgurl',
                id: 'imgid'
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
            shopseller: shop2,
            issize: true,
            size: sizemaster
        });


        // Save the Product
        productObj.save(function () {
            productObj2.save(function () {
                productObj3.save(function (err, result) {
                    agent.get('/api/productlistbyshop/' + shop._id)
                        .end(function (req, res) {
                            var shopid = res.body;
                            // console.log(shop._id);
                            (shopid.length).should.match(2);
                            (shopid[0].shopseller._id).should.match(shop.id);
                            (shopid[1].shopseller._id).should.match(shop.id);


                            done();
                        });
                });
            });
        });

    });



    afterEach(function (done) {
        User.remove().exec(function () {
            Shop.remove().exec(function () {
                Shipping.remove().exec(function () {
                    Product.remove().exec(function () {
                        done();
                    });
                });
            });
        });
    });
});