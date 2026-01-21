#!/bin/sh

docker run --rm -it --name gateway-api-docs -p 1313:1313 -v $PWD:/opt/clearhaus/gateway-api-docs clearhaus/gateway-api-docs sh -c "yarn install && yarn serve"
