const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const exec = require('child_process').exec;
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');

const argv = require('minimist')(process.argv.slice(2));

const awspublish = require('gulp-awspublish');
const invalidate = require('gulp-cloudfront-invalidate');
const parallelize = require('concurrent-transform');

const config = {
  production: {
    baseUrl: 'https://developer.clearhaus.com',
    aws: {
      region: process.env.AWS_REGION,
      params: {
        Bucket: 'clrhs-prod-nonpci-docs-gateway'
      },
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,

      distribution: 'd2te2qckkr0lw4',
      paths: ['/*']
    }
  }
}

function uglifyCSS() {
  return gulp.src('src/css/*.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('website/static/css'))
};

function prepJS() {
  return gulp.src(['src/js/typed.js', 'src/js/main.js'])
    .pipe(concat('jsbundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest('website/static/js'))
};

function prepFonts() {
  return gulp.src('src/fonts/*')
    .pipe(gulp.dest('website/static/fonts'))
}

function prepBinaries() {
  return gulp.src('src/*.pdf', 'src/*.txt')
    .pipe(gulp.dest('website/static'))
}

function appBundle() {
  return gulp.src('dist/appBundle.js')
    .pipe(gulp.dest('website/static/js'))
};

function imageMIN() {
  return gulp.src('src/img/**/*')
    .pipe(imagemin({
      optimizationLevel: 5,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('website/static/img'));
};

function hugoClean() {
  return gulp.src('website/public', { read: false })
    .pipe(clean());
};

function hugoBuild() {
  const baseUrl = config[argv.env] ? config[argv.env].baseUrl : config['production'].baseUrl;
  const command = 'hugo -v -b "' + baseUrl + '" --source=website';

  return exec(command, function (err, stdout) {
    console.log(stdout);
  });
};

const hugoPrep = gulp.parallel(uglifyCSS, prepJS, prepFonts, prepBinaries, imageMIN);
const build = gulp.series(hugoPrep, hugoBuild);

function publish() {
  const options = config[argv.env].aws;
  const publisher = awspublish.create(options);

  return gulp.src('website/public/**')
    .pipe(parallelize(publisher.publish(), 10))
    .pipe(publisher.sync())
    .pipe(awspublish.reporter())
    .pipe(invalidate(options));
};

exports.update = hugoPrep;
exports.build = build;
exports.deploy = gulp.series(build, publish);
