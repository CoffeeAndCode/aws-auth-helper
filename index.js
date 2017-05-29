#!/usr/bin/env node

'use strict';

const getCredentialsForBash = require('./lib/getCredentialsForBash');

getCredentialsForBash({
  argv: process.argv.slice(2),
  env: process.env,
  stderr: process.stderr,
  stdin: process.stdin,
  stdout: process.stdout
}).catch((error) => {
  process.stderr.write(error.message + '\n');
  process.exitCode = 1;
});
