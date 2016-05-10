'use strict';

//dependencies
var path = require('path');
// var expect = require('chai').expect;
var keygen = require(path.join(__dirname, '..'));

describe('keygen', function() {

    it('should be able to get host mac addresses', function(done) {
        keygen.macs(function(error, macs) {
            console.log(macs);
            done(error, macs);
        });
    });

});