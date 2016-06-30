'use strict';

//dependencies
var path = require('path');
var async = require('async');
var expect = require('chai').expect;
var keygen = require(path.join(__dirname, '..'));

describe('keygen', function() {
    var key;
    var data = {
        uuid: '123dr34'
    };

    it('should be able to obtain host os details', function(done) {
        keygen.os(function(error, os) {

            //assert
            expect(os.arch).to.exist;
            expect(os.cpus).to.exist;
            expect(os.endianness).to.exist;
            expect(os.freemem).to.exist;
            expect(os.hostname).to.exist;
            expect(os.networkInterfaces).to.exist;
            expect(os.platform).to.exist;
            expect(os.release).to.exist;
            expect(os.tmpdir).to.exist;
            expect(os.totalmem).to.exist;
            expect(os.type).to.exist;
            expect(os.uptime).to.exist;

            done(error, os);
        });
    });

    it('should be able to get host mac address', function(done) {
        keygen.mac(function(error, mac) {
            //assert
            expect(error).to.not.exist;
            expect(mac).to.exist;
            done(error, mac);
        });
    });


    it('should be able to generate unique machine id', function(done) {
        keygen.machine(function(error, machineId) {
            //assert
            expect(error).to.not.exist;
            expect(machineId).to.exist;
            done(error, machineId);
        });
    });

    it('should return same machine id even when called multiple times', function(done) {
        function getMachineId(next) {
            keygen.machine(next);
        }

        async.parallel([
            getMachineId, getMachineId, getMachineId
        ], function(error, machineIds) {
            //asserts
            expect(error).to.not.exist;
            expect(machineIds[0]).to.equal(machineIds[1]);
            expect(machineIds[0]).to.equal(machineIds[2]);
            expect(machineIds[1]).to.equal(machineIds[2]);

            done(error, machineIds);
        });
    });

    it('should be able to generate key', function(done) {
        keygen.generate(data, function(error, productKey) {
            //assert
            expect(error).to.not.exist;
            expect(productKey).to.exist;
            key = productKey;
            done(error, productKey);
        });
    });

    it('should be able to verify key', function(done) {
        keygen.verify(key, data, function(error, isValid) {
            //assert
            expect(error).to.not.exist;
            expect(isValid).to.be.true;

            done(error, isValid);
        });
    });

    it('should return same key even when called multiple times', function(done) {
        function getKey(next) {
            keygen.generate(data, next);
        }

        async.parallel([
            getKey, getKey, getKey
        ], function(error, keys) {
            //asserts
            expect(error).to.not.exist;
            expect(keys[0]).to.eql(keys[1]);
            expect(keys[0]).to.eql(keys[2]);
            expect(keys[1]).to.eql(keys[2]);

            done(error, keys);
        });
    });

});