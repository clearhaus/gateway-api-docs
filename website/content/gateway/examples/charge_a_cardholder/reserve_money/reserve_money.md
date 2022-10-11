---
title: "Reserve_money"
date: 2022-04-13T09:54:07+02:00
anchor: "reserve_money"
weight: 55
---

### Reserve money
The following will reserve EUR 20.50 (2050 cents) on cardholder’s bank account:
```bash
curl -X POST https://gateway.test.clearhaus.com/authorizations \
     -u <your-api-key>: \
     -d "amount=2050"   \
     -d "currency=EUR"  \
     -d "ip=1.1.1.1"    \
     -d "card[pan]=4111111111111111" \
     -d "card[expire_month]=06"      \
     -d "card[expire_year]=2022"     \
     -d "card[csc]=123"              \
     -H "Signature: <signing-api-key> RS256-hex <signature>"
```
Example response (snippet):
```json
{
    "id": "84412a34-fa29-4369-a098-0165a80e8fda",
    "status": {
        "code": 20000
    },
    "csc": {
        "present": true,
        "matches": true
    },
    "processed_at": "2018-07-09T12:58:56+00:00",
    "_links":{
        "captures":{"href": "/authorizations/84412a34-fa29-4369-a098-0165a80e8fda/captures" }
    }
}
```
In order to actually transfer money from cardholder’s bank account to your merchant bank account you will have to make a capture transaction.
{{% notice %}}
**Notice:** Some issuers will approve authorizations although the CSC did not match; in this case the `status` `code` will be `20000` but `csc` `matches` will be `false`. Please be aware that rules to disallow captures for such authorizations may be in place for a merchant.
{{% /notice %}}

{{% notice %}}
**Notice**: `csc` `matches` is `true`if issuer or card scheme confirmed CSC to match; it is `false` if issuer or card scheme did not perform validation or if validation failed.
{{% /notice %}}
