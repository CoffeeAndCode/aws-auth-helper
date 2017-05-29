'use strict';

module.exports = function getProfileName(cli) {
  if (cli.argv.length > 0) {
    return cli.argv[0];
  }

  if (cli.env.AWS_PROFILE) {
    return cli.env.AWS_PROFILE;
  }

  return 'default';
}
