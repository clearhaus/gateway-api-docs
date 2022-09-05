
FROM debian:buster

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends curl python-pygments git ca-certificates && \
    apt-get install -y wget && \
    rm -rf /var/lib/apt/lists/*

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo 'deb http://dl.yarnpkg.com/debian/ stable main' > /etc/apt/sources.list.d/yarn.list

RUN yarn global add gulp
WORKDIR /tmp
COPY ./package.json /tmp/package.json
COPY ./yarn.lock /tmp/yarn.lock

RUN yarn install && \
    mkdir -p /opt/clearhaus/gateway-api-docs && \
    cp -a /tmp/node_modules /opt/clearhaus/gateway-api-docs
RUN yarn
RUN curl -s https://api.github.com/repos/gohugoio/hugo/releases \
    | grep browser_download_url \
    | grep Linux-64bit.deb \
    | grep -v extended \
    | head -1 \
    | cut -d '"' -f 4 \
    | wget -i -

RUN dpkg -i hugo*_Linux-64bit.deb

EXPOSE 1313

WORKDIR /opt/clearhaus/gateway-api-docs
COPY . /opt/clearhaus/gateway-api-docs

COPY ./build/start.sh /usr/local/bin/start
RUN chmod a+x /usr/local/bin/start
CMD /usr/local/bin/start
