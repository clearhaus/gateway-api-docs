---
title: "fetch account information"
date: 2022-04-13T12:37:22+02:00
anchor: "fetch-account-information"
weight: 150
---
## Fetch account information
Some basic account information can be fetched:
```shell
curl https://gateway.test.clearhaus.com/account \
     -u <your-api-key>:
```
Example response (snippet):
```json
{
    "merchant_id": "000000003000001",
    "name": "Merchant Ltd.",
    "country": "GB",
    "mcc": "1111",
    "descriptor": "merchant.com",
    "transaction_rules":"reject authorization if amount > 100 EUR and (not fully 3dsecure)",
    "acquirer": {
        "visa_bin": 438309,
        "mastercard_bin": 526571
    }
}
```
See [account resource](/#account) documentation for further details.
