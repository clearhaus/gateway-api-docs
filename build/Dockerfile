FROM node:trixie-slim

# Install Hugo
RUN apt-get update && \
    apt-get install -y hugo && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Yarn 1.x first, then upgrade to Yarn 4.12.0
# This must be done before copying package.json to avoid packageManager field conflictsnpm install -g corepack
RUN npm install -g npm@latest
RUN corepack enable
RUN corepack prepare yarn@4.12.0 --activate

WORKDIR /opt/clearhaus/gateway-api-docs
COPY . /opt/clearhaus/gateway-api-docs

EXPOSE 1313

RUN yarn install
