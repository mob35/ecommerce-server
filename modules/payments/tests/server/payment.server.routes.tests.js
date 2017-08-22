'use strict';

var should = require('should'),
    request = require('supertest'),
    path = require('path'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Cart = mongoose.model('Cart'),
    Product = mongoose.model('Product'),
    Order = mongoose.model('Order'),
    express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
    agent,
    credentials,
    user,
    cart,
    product,
    order;

/**
 * Payment routes tests
 */
describe('Create Payment', function() {

    before(function(done) {
        // Get application
        app = express.init(mongoose);
        agent = request.agent(app);

        done();
    });

    beforeEach(function(done) {
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
            }]
        });

        cart = new Cart({
            products: [{
                product: product,
                itemamount: 100,
                qty: 1
            }],
            amount: 100,
            user: user
        });
        // Save a user to the test db and create new Payment
        user.save(function() {
            product.save(function() {
                cart.save(function() {
                    order = {
                        shipping: {
                            address: '499/195',
                            subdistrict: 'Khongthanon',
                            district: 'Saimai',
                            province: 'Bangkok',
                            postcode: '10220'
                        },
                        items: [{
                            product: product,
                            amount: 100,
                            qty: 1,
                            delivery: {
                                description: 'description',
                                deliverytype: 'deliverytype'
                            }
                        }],
                        payment: {
                            paymenttype: 'Credit',
                            creditno: '2345761890876543',
                            creditname: 'Sirintra Wannakheaw',
                            expdate: '02/2018',
                            creditcvc: '222',
                            counterservice: ''
                        },
                        cart: cart.id,
                        discount: 100,
                    };
                    done();
                });
            });
            // payment = {
            //     name: 'Payment name'
            // };


        });
    });

    it('should be able to save a Payment ', function(done) {
        agent.post('/api/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function(signinErr, signinRes) {
                // Handle signin error
                if (signinErr) {
                    return done(signinErr);
                }
                // Get the userId
                var userId = user.id;
                agent.get('/api/carts')
                    .end(function(cart1GetErr, cart1) {
                        // Handle Orders save error
                        if (cart1GetErr) {
                            return done(cart1GetErr);
                        }
                        (cart1.body.length).should.equal(1);


                        // Save a new Order
                        agent.post('/api/payments')
                            .send(order)
                            .expect(200)
                            .end(function(orderSaveErr, orderSaveRes) {
                                // Handle Order save error
                                if (orderSaveErr) {
                                    return done(orderSaveErr);
                                }

                                // Get a list of Orders
                                agent.get('/api/orders')
                                    .end(function(ordersGetErr, ordersGetRes) {
                                        // Handle Orders save error
                                        if (ordersGetErr) {
                                            return done(ordersGetErr);
                                        }

                                        // Get Orders list
                                        var orders = ordersGetRes.body;

                                        // Set assertions
                                        (orders[0].user._id).should.equal(userId);
                                        (orders[0].amount).should.match(100);
                                        (orders[0].totalamount).should.match(0);

                                        // Call the assertion callback
                                        agent.get('/api/carts')
                                            .end(function(cartGetErr, cartGetRes) {
                                                // Handle Orders save error
                                                if (cartGetErr) {
                                                    return done(cartGetErr);
                                                }

                                                // Get Orders list
                                                var cart = cartGetRes.body;

                                                // Set assertions
                                                (cart.length).should.equal(0);

                                                // Call the assertion callback
                                                done();
                                            });
                                    });
                            });
                    });
            });
    });
    afterEach(function(done) {
        User.remove().exec(function() {
            Product.remove().exec(function() {
                Cart.remove().exec(function() {
                    // Order.remove().exec(function() {
                    Order.remove().exec(done);
                    // });
                });
            });

            // done();
        });
    });
});