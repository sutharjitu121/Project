'use strict';
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';
const env = process.env.NODE_ENV;
console.log(`Node environment: ${env}`);
module.exports = require(`./config.${env}.json`);