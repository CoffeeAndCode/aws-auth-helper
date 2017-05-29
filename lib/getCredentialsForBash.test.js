'use strict';

const concat = require('concat-stream');
const { PassThrough } = require('stream');
const getCredentialsForBash = require('./getCredentialsForBash');

test('will print to stderr the selected aws profile name', () => {
  return new Promise((resolve, reject) => {
    expect.assertions(1);

    const stderr = new PassThrough();
    const stdin = new PassThrough();
    stderr.pipe(concat((output) => {
      expect(output.toString('utf8')).toMatch('Using the "default" aws profile.');
      resolve();
    }));

    setTimeout(() => {
      stdin.write('hello\n');
    }, 10);

    return getCredentialsForBash({
      argv: [],
      env: {},
      stderr,
      stdin,
      stdout: new PassThrough(),
    }).then(() => {
      stderr.end();
    }, () => {
      stderr.end();
    });
  });
});

test('will print to stderr the selected aws profile name if passed profile name via cli', () => {
  return new Promise((resolve, reject) => {
    expect.assertions(1);

    const stderr = new PassThrough();
    const stdin = new PassThrough();
    stderr.pipe(concat((output) => {
      expect(output.toString('utf8')).toMatch('Using the "cliProfileName" aws profile.');
      resolve();
    }));

    setTimeout(() => {
      stdin.write('hello\n');
    }, 10);

    return getCredentialsForBash({
      argv: ['cliProfileName'],
      env: {},
      stderr,
      stdin,
      stdout: new PassThrough(),
    }).then(() => {
      stderr.end();
    }, () => {
      stderr.end();
    });
  });
});
