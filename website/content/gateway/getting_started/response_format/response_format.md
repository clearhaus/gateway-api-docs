---
title: "Response_format"
date: 2022-04-12T13:49:00+02:00
anchor: "response-format"
weight: 25
---
## Response format
All responses will be delivered in JSON format (see [JSON-HAL](https://tools.ietf.org/html/draft-kelly-json-hal-08)).

```
Content-Type: application/vnd.clearhaus-gateway.hal+json; version=0.10.0; charset=utf-8
```
where the version follows [Semantic Versioning](https://semver.org/).
We use HTTP response codes to indicate API response status:
```
Number  Text
200     OK
201     Created
400     Bad Request
401     Unauthorized
404     Not Found
5xx     Server Error
```
