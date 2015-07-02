var fs        = require('fs'),
    path      = require('path'),
    assert    = require('assert'),
    cryptoRC4 = require('../index.js');

var Alice = new cryptoRC4(
    fs.readFileSync(path.resolve(__dirname, './keys/Alice.pem'), {encoding: 'UTF-8'}),
    fs.readFileSync(path.resolve(__dirname, './keys/Bob.pub.pem'), {encoding: 'UTF-8'})
);

var Bob = new cryptoRC4(
    fs.readFileSync(path.resolve(__dirname, './keys/Bob.pem'), {encoding: 'UTF-8'}),
    fs.readFileSync(path.resolve(__dirname, './keys/Alice.pub.pem'), {encoding: 'UTF-8'})
);

var message = 'SOME SENSITIVE DATA';

describe('Crypto RC4', function () {
    it('#encrypt', function () {
        var encrypted = Alice.encrypt(message);
        assert.equal(typeof encrypted, 'object', 'return object');
        assert.ok(encrypted.hasOwnProperty('key'), 'returned object has child `key`');
        assert.ok(encrypted.hasOwnProperty('data'), 'returned object has child `data`');
    });

    it('#decrypt', function () {
        var encrypted = Alice.encrypt(message);
        var decrypted = Bob.decrypt(encrypted.data, encrypted.key);

        assert.equal(typeof decrypted, 'string', 'return string');
        assert.equal(message, decrypted, 'decrypted message is the same as message');
    });

    it('#sign', function () {
        var sign = Alice.sign(message);
        assert.equal(typeof sign, 'string', 'return string');
    });

    it('#verify', function () {
        var sign = Alice.sign(message);

        assert.ok(Bob.verify(message, sign), 'signature is valid');
    });
})
