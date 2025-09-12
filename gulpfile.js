const gulp = require('gulp');
const exec = require('child_process').exec;

const argv = require('minimist')(process.argv.slice(2));

const awspublish = require('gulp-awspublish');
const invalidate = require('gulp-cloudfront-invalidate');
const parallelize = require('concurrent-transform');

const config = {
  production: {
    baseUrl: 'https://docs.gateway.clearhaus.com/',
    aws: {
      region: process.env.AWS_REGION,
      params: {
        Bucket: 'clrhs-prod-nonpci-docs-gateway'
      },
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,

      distribution: 'E78MG8DOLYAEP',
      paths: ['/*']
    }
  }
}

function build() {
  const baseUrl = config[argv.env] ? config[argv.env].baseUrl : config['production'].baseUrl;
  const command = 'hugo -v -b "' + baseUrl + '" --source=website';

  return exec(command, function (err, stdout) {
    console.log(stdout);
  });
};

function publish() {
  const options = config[argv.env].aws;
  const publisher = awspublish.create(options);

  return gulp.src('website/public/**')
    .pipe(parallelize(publisher.publish(), 10))
    .pipe(publisher.sync())
    .pipe(awspublish.reporter())
    .pipe(invalidate(options));
};

exports.build = build;
exports.deploy = gulp.series(build, publish);
