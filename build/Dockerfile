
FROM debian:buster

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends curl python-pygments git ca-certificates && \
    apt-get install -y wget && \
    curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list && \
    apt-get update -qq && apt-get install -y --no-install-recommends nodejs yarn && \
    apt -y install hugo && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /tmp
COPY ./package.json /tmp/package.json
COPY ./yarn.lock /tmp/yarn.lock

RUN yarn install && \
    mkdir -p /opt/clearhaus/gateway-api-docs && \
    cp -a /tmp/node_modules /opt/clearhaus/gateway-api-docs

WORKDIR /opt/clearhaus/gateway-api-docs
COPY . /opt/clearhaus/gateway-api-docs

EXPOSE 1313

COPY ./build/start.sh /usr/local/bin/start
RUN chmod a+x /usr/local/bin/start
CMD /usr/local/bin/start
