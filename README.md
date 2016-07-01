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

//generate key
keygen.generate(<payload>, function(error, key){
    ...
});

//verify key
keygen.verify(<key>, <payload>, function(error, isValid){
    ...
});
```

## Options
Internal configuration of `byteskode-keygen` can be altered by set a value to a specific options. The structure of the options is

```js
{
    encryption: 'md5', //encryption algorithm
    encoding: 'hex', //encoding format
    keyLength: 20, //default key length
    chunkSize: 4, //chuck of keys to be formatted
    format: true, //format generated key
    separator: '-', //key separator 
    secret: undefined //encyption key default to machine id
}
```

To alter any configuration just pass your option overrides as

```js
var keygen = require('byteskode-keygen');

//change encryption algorithm
keygen.options.encryption = 'sha256';
```

To restore default settings

```js
var keygen = require('byteskode-keygen');

keygen.restore();
```

## Structure
The structure of the key generated is

```js
{ 
  prefix: 'E43427',
  key: '5540-7479-75D9-D0F9-2C6F',
  suffix: 'D2639D',
  secret: 'be9d373a4e73de831216c228cb729c71' 
}
```

Where

- `prefix` - Part of the key extracted to be used as prefix in verification
- `key` - The actual key with default length of 20 characters
- `suffix` - Part of the key extracted to be used as suffix in verification
- `secret` - A secret key used in generating a key


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