# Gateway API documentation

## Installation

```bash
git clone https://github.com/clearhaus/gateway-api-docs.git
```

Unless `bower_components` is present:

```bash
apt-get install -y nodejs npm

npm install -g bower

bower install
```

## Development

Update gateway documentation in source/index.md.

Run middleman webserver:

```bash
bundle exec middleman
```
