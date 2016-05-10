'use strict';

//dependencies
var path = require('path');
var expect = require('chai').expect;
var keygen = require(path.join(__dirname, '..'));

describe('keygen', function() {

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

            done(error, os);
        });
    });

    it('should be able to get host mac addresses', function(done) {
        keygen.macs(function(error, macs) {
            expect(error).to.not.exist;
            expect(macs).to.exist;
            expect(Object.keys(macs)).to.have.length.above(0);
            done(error, macs);
        });
    });

});