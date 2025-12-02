#!/bin/sh

docker run --rm -it -p 1313:1313 clearhaus/gateway-api-docs sh -c "yarn install && yarn serve"
