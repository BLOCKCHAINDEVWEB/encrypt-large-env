require('dotenv').config({ path: './.env' });
const express = require('express');
const CryptoJS = require('crypto-js');
const { GLOBALS_ENV_ENCRYPT_VAR } = require('./enc.env.js');

const app = express();
app.use(express.json());

const { GLOBALS_ENV_ENCRYPT_KEY } = process.env

const decryptDatas = CryptoJS.AES.decrypt(GLOBALS_ENV_ENCRYPT_VAR, GLOBALS_ENV_ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);

const env = JSON.parse(decryptDatas);
console.log(env['MUMBAI_TOKEN_NAME_NETWORK']);

app.get('/', (req, res) => {
  res.json({ status: 200, message: `Your global environnement decrypt: ${decryptDatas}` });
});

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});