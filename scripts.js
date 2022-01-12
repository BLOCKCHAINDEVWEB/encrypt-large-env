require('dotenv').config({ path: './enc.env' });
const fs = require('fs');
const CryptoJS = require('crypto-js');
const { parse } = require('envfile')

fs.readFile('enc.env', 'utf8', (err, data) => {
  if (err) return console.log(err);

  const datasParse = parse(data);
  const globalEnvKey = 'mySecret';
  const encryptDatas = CryptoJS.AES.encrypt(JSON.stringify(datasParse), globalEnvKey).toString();

  let dataFile = `
module.exports = {
  GLOBALS_ENV_ENCRYPT_VAR: "${encryptDatas}"
}
  `;

  fs.writeFileSync('enc.env.js', JSON.parse(JSON.stringify(dataFile)));
});
