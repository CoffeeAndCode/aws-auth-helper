'use strict';

const AWS = require('aws-sdk');
const fs = require('fs');
const ini = require('ini');
const path = require('path');

module.exports = function getAWSConfig (cli, profile) {
  const creds = new AWS.SharedIniFileCredentials({ profile: profile });
  const configFilePath = cli.env['AWS_CONFIG_FILE'] ||
    path.join(path.dirname(creds.filename || `${cli.env.HOME}/.aws/credentials`), 'config');
  const config = ini.parse(fs.readFileSync(path.resolve(configFilePath), 'utf-8'))[`profile ${profile}`];

  if (typeof config === 'undefined') {
    throw new Error(`aws profile not found in config ${path.resolve(configFilePath)}`);
  }

  return config;
};
