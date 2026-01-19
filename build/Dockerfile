FROM node:trixie-slim

# Install Hugo
RUN apt-get update && \
    apt-get install -y hugo && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /opt/clearhaus/gateway-api-docs
COPY . /opt/clearhaus/gateway-api-docs

# Enable Corepack to use the Yarn version specified in package.json
RUN corepack enable

EXPOSE 1313

RUN yarn install
