---
title: "Validate_account_name"
date: 2026-10-13T12:00:00+02:00
anchor: "validate_account_name"
weight: 148
---
## Validate account name
Before charging or paying out to a card, you can check whether the name supplied by the cardholder matches the name held by the issuing bank:
```shell
curl -X POST https://gateway.test.clearhaus.com/validations \
     -u <your-api-key>: \
     -d "card[pan]=4111111111111111" \
     -d "card[expire_month]=06"      \
     -d "card[expire_year]=2030"     \
     -d "cardholder[name][first_name]=John"  \
     -d "cardholder[name][middle_name]=Q"    \
     -d "cardholder[name][last_name]=Doe" \
     -H "Signature: <signing-api-key> RS256-hex <signature>"
```
Example response (snippet):
```json
{
    "id": "c3f1a9d2-7b6e-4e1f-9a24-6d8b2c5f7e91",
    "status": {
        "code": 20000
    },
    "processed_at": "2026-10-01T10:00:00+00:00",
    "scheme_response": {
        "visa": {
            "payment_account_reference": "V0010013018276438474264573911"
        }
    },
    "name_match": "partial_match",
    "name_components_match": {
        "first_name": "match",
        "middle_name": "no_match",
        "last_name": "match"
    }
}
```

For a Mastercard card, `scheme_response` is keyed by `mastercard` and `name_components_match` is not included.

A declined validation only includes the status:
```json
{
    "id": "7e2a5c18-3d4b-4a9f-b6c1-8f0e2d4a6b35",
    "status": {
        "code": 40410,
        "message": "Declined by issuer or card scheme"
    },
    "processed_at": "2026-10-01T10:00:00+00:00"
}
```
See [validations resource](/#validations) documentation for further details.
