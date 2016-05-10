'use strict';

//dependencies
var path = require('path');
var expect = require('chai').expect;
var keygen = require(path.join(__dirname, '..'));

describe('keygen', function() {
    var key;

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
        keygen.machineId(function(error, machineId) {
            //assert
            expect(error).to.not.exist;
            expect(machineId).to.exist;
            done(error, machineId);
        });
    });

    it('should be able to generate key', function(done) {
        keygen.key(function(error, productKey) {
            //assert
            expect(error).to.not.exist;
            expect(productKey).to.exist;
            key = productKey;
            done(error, productKey);
        });
    });

    it('should be able to verify key', function(done) {
        keygen.verifyKey(key, function(error, isValid) {
            //assert
            expect(error).to.not.exist;
            expect(isValid).to.be.true;
            
            done(error, isValid);
        });
    });

});