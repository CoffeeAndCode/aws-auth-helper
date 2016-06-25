# AWS Auth Helper

This small application assists with set AWS environment variables from the
credentials returned from a STS `assumeRole` on the command line for subsequent
applications. So far, it only supports easy evaling in Bash environments as in
the following if you install this package globally:

```
npm install -g aws-auth-helper
eval "`aws-auth-helper [aws-profile-name]` npm run deploy"
```

The AWS profile is selected by from the first item that matches:

1. passing a string after the `aws-auth-helper` command
1. `AWS_PROFILE` environment variable
1. `default` as the default

If you choose to use `AWS_PROFILE` make sure that you are passing the environment
variable to the (sub)shell that calls `aws-auth-helper`.

For example:

`export AWS_PROFILE && eval \"`aws-auth-helper` apex deploy\"`


## Requirements

You must have an AWS profile setup in your `~/.aws/credentials` file like
the following:

```ini
[default]
aws_access_key_id = ABCDEFG
aws_secret_access_key = abcdefg
```

You should also have a role based configuration that uses MFA in your
`~/.aws/config` file:

```ini
[profile default]
mfa_serial = arn:aws:iam::1234567890:mfa/username
output = json
region = us-east-1
role_arn = arn:aws:iam::1234567890:role/DesiredRoleName
source_profile = default
```
