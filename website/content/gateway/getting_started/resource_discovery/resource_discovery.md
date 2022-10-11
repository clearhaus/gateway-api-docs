---
title: "Resource discovery"
date: 2022-04-08T14:38:19+02:00
anchor: "resource-discovery"
weight: 20
---
## Resource discovery
The API follows [HATEOAS](https://en.wikipedia.org/wiki/HATEOAS) principle of REST which means all resources are discoverable.
```code
curl https://gateway.test.clearhaus.com \
     -u <your-api-key>:
```
```json
{
    "_links": {
        "authorizations": { "href": "/authorizations" },
        "account":        { "href": "/account" }
    }
}
```
