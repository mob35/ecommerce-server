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
        type: Schema.ObjectId,
        ref: 'Addressmaster'
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
    status: {
        type: String,
        enum: ['confirm', 'complete'],
        default: 'confirm'
    },
    cart: String,
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