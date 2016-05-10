byteskode-keygen
=====================

[![Build Status](https://travis-ci.org/byteskode/byteskode-keygen.svg?branch=master)](https://travis-ci.org/byteskode/byteskode-keygen)

byteskode key generator utility

## Installation
```sh
$ npm install --save byteskode-keygen
```

## Usage

```javascript
var keygen = require('byteskode-keygen');

//generate product key
keygen.productKey(<payload>,function(error, productKey){
    ...
});

//generate licence key
keygen.licenceKey(<payload>,function(error, licenceKey){
    ...
});

//verify product key
keygen.verifyProductKey(<payload>,<productKey>,function(error, productKey){
    ...
});

//verify licence key
keygen.verifyLicenceKey(<payload>,<productKey>,function(error, productKey){
    ...
});
```

## Testing
* Clone this repository

* Install all development dependencies
```sh
$ npm install
```

* Then run test
```sh
$ npm test
```

## References
- [Hash Function](https://en.wikipedia.org/wiki/Hash_function)
- [Product Key](https://en.wikipedia.org/wiki/Product_key)
- [Product Activation](https://en.wikipedia.org/wiki/Product_activation)
- [Digital Rights Management](https://en.wikipedia.org/wiki/Digital_rights_management)
- [Keygen](https://en.wikipedia.org/wiki/Keygen)
- [Software License Server](https://en.wikipedia.org/wiki/Software_license_server)

## Contribute
It will be nice, if you open an issue first so that we can know what is going on, then, fork this repo and push in your ideas. Do not forget to add a bit of test(s) of what value you adding.

## Licence
The MIT License (MIT)

Copyright (c) 2015 byteskode & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 