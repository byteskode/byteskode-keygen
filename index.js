'use strict';

/**
 * @name byteskode-keygen
 * @description byteskode key generator utility
 * @singleton
 */

//dependencies
// var async = require('async');
// var _ = require('lodash');
var os = require('os');
var macaddress = require('macaddress');
//----------------
// utilities
//----------------

/**
 * @name macs
 * @description obtain host mac addresses
 * @param  {Function} done a callback to invoke on success or error
 */
exports.macs = function(done) {
    macaddress.all(done);
};


/**
 * @name os
 * @description obtain os host details
 * @param  {Function} done a callback to invoke on success or error
 */
exports.os = function(done) {
    try {
        var host = {};
        host.arch = os.arch();
        host.cpus = os.cpus();
        host.endianness = os.endianness();
        host.freemem = os.freemem();
        // host.homedir = os.homedir();
        host.hostname = os.hostname();
        host.networkInterfaces = os.networkInterfaces();
        host.platform = os.platform();
        host.release = os.release();
        host.tmpdir = os.tmpdir();
        host.totalmem = os.totalmem();
        host.type = os.type();
        // host.userInfo = os.userInfo();
        done(null, host);
    } catch (e) {
        done(e);
    }
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