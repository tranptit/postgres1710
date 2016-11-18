var Crypto = require('crypto-js');

var msg = "KhoaPham Training";
const SECRET_KEY = "jksdf9034dskj&#dchabst3827f"

function encrypt(str){
  return Crypto.AES.encrypt(str, SECRET_KEY).toString();
}

function decrypt(str){
  return Crypto.AES.decrypt(str, SECRET_KEY).toString(Crypto.enc.Utf8);
}

module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;
