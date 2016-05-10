'use strict';

/**
 * @name byteskode-keygen
 * @description byteskode key generator utility
 * @singleton
 */

//dependencies
var async = require('async');
var _ = require('lodash');
var os = require('os');
var crypto = require('crypto');
var getmac = require('getmac');

var defaults = {
    encryption: 'md5',
    encoding: 'hex',
    secret: 'HFGK!LD^SDHK~T012_?3DS5&*34GDW!;1120..SD823'
};


/**
 * @name macs
 * @description obtain host mac addresses
 * @param  {Function} done a callback to invoke on success or error
 */
exports.mac = function(done) {
    getmac.getMac(done);
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
        host.uptime = os.uptime();
        // host.userInfo = os.userInfo();
        done(null, host);
    } catch (e) {
        done(e);
    }
};


/**
 * @name machineId
 * @description generate unique machine id based on os details
 * @param  {Function} done a callback to invoke on success or error
 */
exports.machineId = function(done) {
    async.waterfall([

        function getHostDetails(next) {
            exports.os(next);
        },

        function getMacAddress(host, next) {
            exports.mac(function(error, mac) {
                next(error, host, mac);
            });
        },

        function generateMachineId(host, mac, next) {

            //concatenate cpu models
            var cpuModels = host.cpus.map(function(cpu) {
                return cpu.model;
            }).join(':');

            //compute based on machine hardware details
            var id = [cpuModels, mac, host.totalmem].join('|');

            id = crypto.createHash('md5').update(id).digest('hex');

            next(null, id);

        }

    ], done);

};


exports.key = function(options, done) {
    //normalize arguments
    if (options && _.isFunction(options)) {
        done = options;
        options = {};
    }

    //merge options
    options = _.merge({}, defaults, options);


    async.waterfall([

        function getMachineId(next) {
            exports.machineId(next);
        },

        function generateProductKey(machineId, next) {
            //generate product key
            try {
                var hmac = crypto.createHmac(options.encryption, options.secret);

                //extend options with issuer machine id
                options.data = _.merge({}, options.data, {
                    mid: machineId
                });

                if (!_.isEmpty(options.data)) {
                    hmac.update(JSON.stringify(options.data));
                }

                var productKey = hmac.digest(options.encoding);
                next(null, productKey);

            } catch (e) {
                next(e);
            }

        }

    ], done);

};


exports.verifyKey = function(key, options, done) {
    //normalize arguments
    if (options && _.isFunction(options)) {
        done = options;
        options = {};
    }

    async.waterfall([

        function generateKey(next) {
            exports.key(options, next);
        },

        function compare(generateKey, next) {
            var match = (key && generateKey) && (generateKey === key);
            next(null, match);
        }

    ], done);
};