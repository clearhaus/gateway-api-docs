#!/bin/sh

docker build -t ${ECR_ENDPOINT}/gateway-api-docs --file build/Dockerfile .
