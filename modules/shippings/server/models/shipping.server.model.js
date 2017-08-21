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
    detail: String,
    days: Number,
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