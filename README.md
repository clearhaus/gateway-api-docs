# middleman-bootstrap3-sass-slim

## What's required

[Ruby](https://www.ruby-lang.org/) for middleman
[NPM](https://npmjs.org) and [Bower](http://bower.io) for javascript dependancies

## What's included

* A simple bootstrap v3 template with fixed top navigation.
* jQuery, Modernizr and Bootstrap javascript installed by [Bower](http://bower.io)
* The Bootstrap 3 branch from [thomas-mcdonald/bootstrap-sass](https://github.com/thomas-mcdonald/bootstrap-sass) for Bootstrap SASS
* [Slim Templates](http://slim-lang.com)

## Installation

```
git clone https://github.com/acoustep/middleman-bootstrap3-sass-slim.git ~/.middleman/bootstrap3-sass-slim

# Install NodeJS from your package manager; debian wheezy:
curl -sL https://deb.nodesource.com/setup | sudo bash -
apt-get install -y nodejs
```

Unless `bower_components` is present, continue:

```
curl -L https://npmjs.org/install.sh | sh

npm install -g bower

bower install
```

## Running the webserver

```
middleman
```
