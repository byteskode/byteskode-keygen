'use strict';

/**
 * @name byteskode-keygen
 * @description byteskode key generator utility
 * @singleton
 */

//dependencies
// var async = require('async');
// var _ = require('lodash');
var macaddress = require('macaddress');
//----------------
// utilities
//----------------
exports.macs = function(done) {
    macaddress.all(done);
};

exports.productKey = function( /*payload, options, done*/ ) {
    // body...
};


exports.verifyProductKey = function( /*payload, options, done*/ ) {
    // body...
};

exports.licenceKey = function( /*payload, options, done*/ ) {
    // body...
};

exports.verifyLicenceKey = function( /*payload, options, done*/ ) {
    // body...
};