# Gateway API documentation

## Installation

```bash
git clone https://github.com/clearhaus/gateway-api-docs.git

docker build -t gateway-api-docs .
```

## Development

Update gateway documentation in source/index.md.

Run middleman webserver:

```bash
docker run --rm -it -p 4567:4567 -v /path/to/gateway-api-docs.git:/web gateway-api-docs
```

Browse http://localhost:4567
