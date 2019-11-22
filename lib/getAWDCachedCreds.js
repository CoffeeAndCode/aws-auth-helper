'use strict';
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

module.exports = function getAWSConfig(cli, profile) {
    const creds = new AWS.SharedIniFileCredentials({ profile: profile });
    const configFilePath = cli.env['AWS_CONFIG_FILE'] ||
        path.join(path.dirname(creds.filename || `${cli.env.HOME}/.aws/credentials`), 'config');

    const cliPath = `${configFilePath.replace('config', '')}/cli/cache`;

    const checkCliCacheDir = fs.readdirSync(path.resolve(cliPath), 'utf-8');

    if (checkCliCacheDir && checkCliCacheDir.length > 0) {
        const cachedFile = fs.readFileSync(`${cliPath}/${checkCliCacheDir[0]}`, 'utf-8');
        if (cachedFile) {
            const cached = JSON.parse(cachedFile);
            const expiryDate = new Date(cached.Credentials.Expiration).getTime()
            const now = new Date().getTime();
            if (expiryDate > now) {
                return cached.Credentials;
            } 
        }
    }
};
