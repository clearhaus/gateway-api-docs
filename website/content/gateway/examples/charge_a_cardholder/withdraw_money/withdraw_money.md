---
title: "Withdraw_money"
date: 2022-04-13T09:54:07+02:00
anchor: "withdraw_money"
weight: 60
---

### Withdraw money
The following will make a capture transaction and withdraw what you have reserved on cardholder’s bank account.
```shell
curl -X POST \
  https://gateway.test.clearhaus.com/authorizations/84412a34-fa29-4369-a098-0165a80e8fda/captures \
  -u <your-api-key>: \
  -H "Signature: <signing-api-key> RS256-hex <signature>"
```
You can withdraw a partial amount by providing an {{% highlight_text %}} amount{{% /highlight_text %}}parameter:
```shell
curl -X POST \
  https://gateway.test.clearhaus.com/authorizations/84412a34-fa29-4369-a098-0165a80e8fda/captures \
  -u <your-api-key>: \
  -d "amount=1000"   \
  -H "Signature: <signing-api-key> RS256-hex <signature>"
```
Example response (snippet):
```json
{
    "id": "d8e92a70-3030-4d4d-8ad2-684b230c1bed",
    "status": {
        "code": 20000
    },
    "processed_at": "2018-07-09T12:58:56+00:00",
    "amount": 1000,
    "_links": {
        "authorization": {
            "href": "/authorizations/84412a34-fa29-4369-a098-0165a80e8fda"
        },
        "refunds": {
            "href": "/authorizations/84412a34-fa29-4369-a098-0165a80e8fda/refunds"
        }
    }
}
```
