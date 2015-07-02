var crypto  = require('crypto'),
    NodeRSA = require('node-rsa');



function encryptRC4(data, key) {
    var cipher = crypto.createCipheriv('rc4', new Buffer(key), '');
    var sealedBuf = [];
    sealedBuf.push(cipher.update(new Buffer(data)));
    sealedBuf.push(cipher.final());

    // Passing length of buffers as second arg excludes 1 loop
    var sealed = Buffer.concat(sealedBuf, sealedBuf[0].length + sealedBuf[1].length);
    
    return sealed.toString('base64');
}

function decryptRC4(data, key) {
    var decipher = crypto.createDecipheriv('rc4', key, '');

    return decipher.update(data, 'base64', 'utf8') + decipher.final('utf8');
}



var cryptoRC4 = module.exports = function(private_key, public_key, rc4KeyLen) {
    this._rc4KeyLen = rc4KeyLen || 10;
    this._privateKey = private_key;
    this._publicKey = public_key;
};

cryptoRC4.prototype.encrypt = function(cleardata) {
    var rc4Key = crypto.randomBytes(this._rc4KeyLen);

    return {
        'data': encryptRC4(cleardata, rc4Key),
        'key': new NodeRSA(this._publicKey).encrypt(rc4Key).toString('base64')
    };
};

cryptoRC4.prototype.decrypt = function(data, encryptedKey) {
    var key = new NodeRSA(this._privateKey).decrypt(encryptedKey);
    return decryptRC4(data, key);
};

cryptoRC4.prototype.sign = function(data) {
    var signature = crypto.createSign('SHA1');
    signature.update(data);

    return signature.sign(this._privateKey, 'base64');
};

cryptoRC4.prototype.verify = function(data, signature) {
    var verifier = crypto.createVerify('SHA1');
    verifier.update(data);

    return verifier.verify(this._publicKey, signature, 'base64');
};
