FROM node:trixie-slim

# Install Hugo
RUN apt-get update && \
    apt-get install -y hugo && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Remove any existing yarn binary to avoid conflicts with corepack
RUN rm -f /usr/local/bin/yarn /usr/local/bin/yarnpkg || true

# Install and enable corepack
RUN npm install -g corepack && \
    corepack enable && \
    corepack prepare yarn@4.12.0 --activate

WORKDIR /opt/clearhaus/gateway-api-docs
COPY . /opt/clearhaus/gateway-api-docs

EXPOSE 1313

RUN yarn install
