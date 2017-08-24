'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Shipping Schema
 */
var ShippingSchema = new Schema({
    name: {
        type: String,
        required: 'Please fill Shipping name'
    },
    detail: {
        type: String,
        required: 'Please fill Shipping detail'
    },
    days: {
        type: Number,
        required: 'Please fill Shipping days'
    },
    price: {
        type: Number,
        required: 'Please fill Shipping price'
    },
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Shipping', ShippingSchema);