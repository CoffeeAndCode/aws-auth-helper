'use strict';

const readline = require('readline');

module.exports = function getMFAToken (cli) {
  cli.stdin.setEncoding('utf8');

  return new Promise((resolve, reject) => {
    cli.stderr.write('🔒  AWS MFA token: ');

    const io = readline.createInterface({
      input: cli.stdin,
      output: cli.stdout
    });

    io.on('line', function readLineFromInput (token) {
      io.close();
      resolve(token);
    });
  });
};
