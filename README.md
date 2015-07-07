# crypto-rc4 [![Build Status](https://travis-ci.org/execmd/crypto-rc4.svg)](https://travis-ci.org/execmd/crypto-rc4)
Javascript library for simple crypting with RC4 key sharing data over internet

## Example

```javascript
var fs        = require('fs'),
    cryptoRC4 = require('crypto-rc4');

var crypto = new cryptoRC4(
    fs.readFileSync('private.pem', {encoding: 'UTF-8'}),
    fs.readFileSync('public.pem'), {encoding: 'UTF-8'})
);

var message = 'SOME SENSITIVE DATA';

var encrypted = crypto.encrypt(message);
console.log(encrypted);
// { data: [Base64 of encrypted data], key: [Base64 of encryption key]}

var sign = crypto.sign(message);
console.log(sign);
// [Base64 of signature]

var decrypted = crypto.decrypt(encrypted.data, encrypted.key);
console.log(decrypted);
// SOME SENSITIVE DATA
console.log(crypto.verify(decrypted, sign));
// true
```

## Installing

```shell
npm install crypto-rc4
```
> <sub>Requires nodejs >= 0.10.x or io.js >= 1.x</sub>

### Testing

```shell
npm test
```

## Usage

```javascript
var cryptoRC4 = require('crypto-rc4');
var crypto = new cryptoRC4(privateKey, publicKey[, rc4KeyLen]);
```
This library uses node-rsa module, which is used to operate with RSA keys, so
* privateKey - {string|buffer}
* publicKey - {string|buffer}
* rc4KeyLen - {int} optional, Define how long will be encryption key in bytes. If not defined it sets to 10.

```javascript
var crypto.encrypt(cleartext);
```
* cleartext - {string} The string which we want to encrypt
