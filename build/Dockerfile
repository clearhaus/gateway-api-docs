FROM debian:trixie-slim

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y hugo yarnpkg && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /opt/clearhaus/gateway-api-docs
COPY . /opt/clearhaus/gateway-api-docs

EXPOSE 1313

RUN yarnpkg install
