'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Order Schema
 */
var OrderSchema = new Schema({
    shipping: {
        address: String,
        subdistrict: String,
        district: String,
        province: String,
        postcode: String,
    },
    items: [{
        product: {
            type: Schema.ObjectId,
            ref: 'Product'
        },
        qty: Number,
        amount: Number,
        delivery: {
            description: String,
            deliverytype: String
        },
    }],
    payment: {
        paymenttype: String,
        creditno: String,
        creditname: String,
        expdate: String,
        creditcvc: String,
        counterservice: String
    },
    amount: Number,
    discount: Number,
    totalamount: Number,
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Order', OrderSchema);