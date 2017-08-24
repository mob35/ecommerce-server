'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Paymentmaster Schema
 */
var PaymentmasterSchema = new Schema({
    name: {
        type: String,
        default: '',
        required: 'Please fill Paymentmaster name',
        trim: true
    },
    detail: {
        type: String,
        default: '',
        required: 'Please fill Paymentmaster detail',
        trim: true
    },
    img: {
        url: {
            type: String,
            required: 'Please fill Paymentmaster imgUrl',
        }
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

mongoose.model('Paymentmaster', PaymentmasterSchema);