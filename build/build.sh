#!/bin/sh

docker build -t ${ECR_ENDPOINT}/gateway-api-docs-v2 --file build/Dockerfile .
