'use strict';

const concat = require('concat-stream');
const { PassThrough } = require('stream');
const getMFAToken = require('./getMFAToken');

test('will print MFA token prompt to stderr', () => {
  expect.assertions(1);

  return new Promise((resolve, reject) => {
    const stderr = new PassThrough();
    const stdin = new PassThrough();

    stderr.pipe(concat((output) => {
      expect(output.toString('utf8')).toMatch('🔒  AWS MFA token:');
      resolve();
    }));

    setTimeout(() => {
      stdin.write('12345\n');
    }, 1);

    return getMFAToken({
      argv: [],
      env: {},
      stderr,
      stdin,
      stdout: new PassThrough(),
    }).then(() => stderr.end(), () => stderr.end()).catch(reject);
  });
});

test('will resolve with the MFA token', () => {
  expect.assertions(1);

  const stderr = new PassThrough();
  const stdin = new PassThrough();

  setTimeout(() => {
    stdin.write('12345\n');
  }, 1);

  return getMFAToken({
    argv: [],
    env: {},
    stderr,
    stdin,
    stdout: new PassThrough(),
  }).then((token) => {
    expect(token).toBe('12345');
  });
});
