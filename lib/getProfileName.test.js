'use strict';

const getProfileName = require('./getProfileName');

test('will return default by default', () => {
  expect(getProfileName({
    argv: [],
    env: {}
  })).toBe('default');
});

test('will return the first argument if present', () => {
  expect(getProfileName({
    argv: ['argvProfile'],
    env: {}
  })).toBe('argvProfile');
});

test('will return the env value for AWS_PROFILE if present', () => {
  expect(getProfileName({
    argv: [],
    env: { AWS_PROFILE: 'envProfile' }
  })).toBe('envProfile');
});

test('will give precedence to the cli argument over env value', () => {
  expect(getProfileName({
    argv: ['argvProfile'],
    env: { AWS_PROFILE: 'envProfile' }
  })).toBe('argvProfile');
});
