'use strict';

const path = require('path');
const getMFAToken = require('./getAWSConfig');

describe('ini file from env variable', () => {
  test('will return a config object', () => {
    const config = getMFAToken({
      argv: [],
      env: {
        AWS_CONFIG_FILE: path.join(__dirname, '../fixtures/example.ini'),
      },
    }, 'default');

    expect(config.mfa_serial).toBe('arn:aws:iam::333333333333:mfa/env_default');
  });

  test('will return a config object for a specified profile', () => {
    const config = getMFAToken({
      argv: [],
      env: {
        AWS_CONFIG_FILE: path.join(__dirname, '../fixtures/example.ini'),
      },
    }, 'env_two');

    expect(config.mfa_serial).toBe('arn:aws:iam::444444444444:mfa/env_two');
  });

  test('will raise an error if config file not found', () => {
    function attemptToGetMFAToken() {
      getMFAToken({
        argv: [],
        env: {
          AWS_CONFIG_FILE: path.join(__dirname, '../fixtures/not/found/example.ini'),
        },
      }, 'default');
    }

    expect(attemptToGetMFAToken).toThrow('no such file or directory');
  });

  test('will raise an error if profile not found in config', () => {
    function attemptToGetMFAToken() {
      getMFAToken({
        argv: [],
        env: {
          AWS_CONFIG_FILE: path.join(__dirname, '../fixtures/example.ini'),
        },
      }, 'not_found');
    }

    expect(attemptToGetMFAToken).toThrow('aws profile not found in config');
  });
});

describe('ini file from user\'s aws config file', () => {
  test('will return a config object', () => {
    const config = getMFAToken({
      argv: [],
      env: {
        HOME: path.join(__dirname, '../fixtures'),
      },
    }, 'default');

    expect(config.mfa_serial).toBe('arn:aws:iam::111111111111:mfa/home_default');
  });

  test('will return a config object for a specified profile', () => {
    const config = getMFAToken({
      argv: [],
      env: {
        HOME: path.join(__dirname, '../fixtures'),
      },
    }, 'home_two');

    expect(config.mfa_serial).toBe('arn:aws:iam::222222222222:mfa/home_two');
  });

  test('will raise an error if config file not found', () => {
    function attemptToGetMFAToken() {
      getMFAToken({
        argv: [],
        env: {
          HOME: path.join(__dirname, '../fixtures/not/found'),
        },
      }, 'default');
    }

    expect(attemptToGetMFAToken).toThrow('no such file or directory');
  });

  test('will raise an error if profile not found in config', () => {
    function attemptToGetMFAToken() {
      getMFAToken({
        argv: [],
        env: {
          HOME: path.join(__dirname, '../fixtures'),
        },
      }, 'not_found');
    }

    expect(attemptToGetMFAToken).toThrow('aws profile not found in config');
  });
});
