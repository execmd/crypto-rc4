var fs        = require('fs'),
    path      = require('path'),
    assert    = require('assert'),
    cryptoRC4 = require('./index.js');

var crypto = new cryptoRC4(
    fs.readFileSync(path.resolve(__dirname, './test/keys/Alice.pem'), {encoding: 'UTF-8'}),
    fs.readFileSync(path.resolve(__dirname, './test/keys/Alice.pub.pem'), {encoding: 'UTF-8'})
);

var message = 'SOME SENSITIVE DATA';

var encrypted = crypto.encrypt(message);
console.log(encrypted);
var sign = crypto.sign(message);
console.log(sign);

var decrypted = crypto.decrypt(encrypted.data, encrypted.key);
console.log(decrypted);
console.log(crypto.verify(decrypted, sign));
