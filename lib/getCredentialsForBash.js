'use strict';

const AWS = require('aws-sdk');
const getAWSConfig = require('./getAWSConfig');
const getMFAToken = require('./getMFAToken');
const getProfileName = require('./getProfileName');

function assumeRole(cli, profileName, token) {
  const awsConfig = getAWSConfig(cli, profileName);
  const sts = new AWS.STS();

  return new Promise((resolve, reject) => {
    sts.assumeRole({
      RoleArn: awsConfig.role_arn,
      RoleSessionName: 'aws-auth-helper',
      SerialNumber: awsConfig.mfa_serial,
      TokenCode: token
    }, function (error, response) {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
}

module.exports = function getCredentialsForBash(cli) {
  return new Promise((resolve, reject) => {
    const profileName = getProfileName(cli);
    cli.stderr.write(`Using the "${profileName}" aws profile.\n`);

    getMFAToken(cli).then((token) => {
      assumeRole(cli, profileName, token).then(response => {
        const credentials = response.Credentials;
        cli.stdout.write(`AWS_ACCESS_KEY_ID=${credentials.AccessKeyId} AWS_SECRET_ACCESS_KEY=${credentials.SecretAccessKey} AWS_SESSION_TOKEN=${credentials.SessionToken}`);
        resolve(credentials);
      }).catch(reject);
    }).catch(reject);
  });
}
