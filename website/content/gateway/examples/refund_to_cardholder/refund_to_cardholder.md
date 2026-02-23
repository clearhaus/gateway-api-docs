---
title: "Refund_to_cardholder"
date: 2022-04-13T12:37:22+02:00
anchor: "refund_to_cardholder"
weight: 125
---
## Refund to cardholder
You can refund all money or a partial amount of what you have withdrawn from cardholder’s bank account:
```shell
curl -X POST \
  https://gateway.test.clearhaus.com/authorizations/84412a34-fa29-4369-a098-0165a80e8fda/refunds \
  -u <your-api-key>: \
  -d "amount=500"    \
  -H "Signature: <signing-api-key> RS256-hex <signature>"
```
Example response (snippet):

```json
{
    "id": "f04c0872-47ce-4683-8d8c-e154221bba14",
    "status": {
        "code": 20000
    },
    "processed_at": "2018-07-09T12:58:56+00:00",
    "amount": 500,
    "_links": {
        "authorization": { "href": "/authorizations/84412a34-fa29-4369-a098-0165a80e8fda" }
    }
}
```
