'use strict';

/**
 * @module byteskode-keygen
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

//defaults
var defaults = {
    encryption: 'md5', //encryption algorithm
    encoding: 'hex', //encoding format
    keyLength: 20, //default key length
    chunkSize: 4, //chuck of keys to be formatted
    format: true, //format generated key
    separator: '-', //key separator 
    secret: undefined //encyption key default to machine id
};


/**
 * @function
 * @name mac
 * @description obtain host mac address
 * @param  {Function} done a callback to invoke on success or error
 * @public
 */
exports.mac = function(done) {
    getmac.getMac(done);
};


/**
 * @function
 * @name os
 * @description obtain os host details
 * @param  {Function} done a callback to invoke on success or error
 * @public
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
 * @function
 * @name machine
 * @description generate unique machine id based on os details
 * @param  {Function} done a callback to invoke on success or error
 * @public
 */
exports.machine = function(done) {
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
            try {

                var hmac = crypto.createHmac(defaults.encryption, mac);

                //concatenate cpu models
                var cpuModels = host.cpus.map(function(cpu) {
                    return cpu.model;
                }).join(':');

                //compute based on machine hardware details
                var id = [cpuModels, mac, host.totalmem].join('|');

                id = hmac.update(id).digest(defaults.encoding);

                next(null, id);
            } catch (e) {
                next(e);
            }

        }

    ], done);

};


/**
 * @function
 * @name generate
 * @description generate key
 * @param  {Object}   options payload used to generate key
 * @param  {Function} done    a callback to invoke on success or error
 * @public
 */
exports.generate = function(data, options, done) {
    //normalize arguments
    if (data && _.isFunction(data)) {
        done = data;
        options = {};
        data = {};
    }

    if (options && _.isFunction(options)) {
        done = options;
        options = {};
    }

    //normalize data
    data = data || {};

    //merge default options
    options = _.merge({}, defaults, options);


    async.waterfall([

        function getMachineId(next) {
            exports.machine(next);
        },

        function generateKey(machineId, next) {
            //generate key
            try {
                //use machineId as secret key if non provided
                options.secret = options.secret || machineId;

                var hmac =
                    crypto.createHmac(options.encryption, options.secret);

                //extend options with issuer machine id
                options.data = _.merge({}, data, {
                    machineId: machineId
                });

                if (!_.isEmpty(data)) {
                    hmac.update(JSON.stringify(data));
                }

                var key = hmac.digest(options.encoding);

                //obtain key length
                var keyLength = key.length;

                //prepare key
                if (keyLength > options.keyLength) {

                    var remainLength = keyLength - options.keyLength;
                    var prefixLength = Math.floor(remainLength / 2);

                    key = {
                        prefix: key.substring(0, prefixLength),
                        key: key.substring(prefixLength, (options.keyLength + prefixLength)),
                        suffix: key.substring((options.keyLength + prefixLength), key.length),
                        secret: options.secret
                    };

                } else {
                    key = {
                        key: key,
                        prefix: null,
                        suffix: null,
                        secret: options.secret
                    };
                }

                //format keys
                if (options.format) {

                    //format prefix
                    if (!_.isEmpty(key.prefix)) {
                        key.prefix = key.prefix.toUpperCase();
                    }

                    //format suffix
                    if (!_.isEmpty(key.suffix)) {
                        key.prefix = key.prefix.toUpperCase();
                    }

                    //format key
                    if (!_.isEmpty(key.key)) {
                        key.key =
                            _(key.key).chunk(options.chunkSize).map(function(chunk) {
                                return chunk.join('');
                            }).join('-').toUpperCase();
                    }

                }

                next(null, key);

            } catch (e) {
                next(e);
            }

        }

    ], done);

};


/**
 * @function
 * @name verify
 * @description verify given key
 * @param  {String}   key     a valid key
 * @param  {Object}   options initial payload used to generate key
 * @param  {Function} done    a callback to invoke on success or error
 * @public
 */
exports.verify = function(key, options, done) {
    //normalize arguments
    if (options && _.isFunction(options)) {
        done = options;
        options = {};
    }

    async.waterfall([

        function generateKey(next) {
            exports.generate(options, next);
        },

        function compare(generateKey, next) {

            var match = (key && generateKey) &&
                (generateKey.key === key.key) &&
                (generateKey.prefix === key.prefix) &&
                (generateKey.suffix === key.suffix) &&
                (generateKey.secret === key.secret);

            next(null, match);
        }

    ], done);
};