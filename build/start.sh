#!/bin/sh

docker run --rm -it --name gateway-api-docs -p 1313:1313 clearhaus/gateway-api-docs sh -c "yarn install && yarn serve"