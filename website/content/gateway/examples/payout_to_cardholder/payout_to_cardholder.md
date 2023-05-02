---
title: "Payout_to_cardholder"
date: 2022-04-13T12:40:24+02:00
anchor: "payout_to_cardholder"
weight: 70
---

## Payout to cardholder
Sometimes cardholders should receive money, e.g. if you wish to pay out some winnings.

The following will transfer EUR 500.00 to cardholder’s bank account from your merchant bank account:
```shell
curl -X POST https://gateway.test.clearhaus.com/credits \
     -u <your-api-key>: \
     -d "amount=50000"  \
     -d "currency=EUR"  \
     -d "ip=1.1.1.1"    \
     -d "card[pan]=4111111111111111" \
     -d "card[expire_month]=06"      \
     -d "card[expire_year]=2022"     \
     -H "Signature: <signing-api-key> RS256-hex <signature>"
```
Example response (snippet):
```json
{
    "id": "1b377999-bafb-42b0-a24f-106b312b0b40",
    "status": {
        "code": 20000
    },
    "processed_at": "2018-07-09T12:58:56+00:00",
    "amount": 50000,
    "currency": "EUR"
}
```

The field {{% highlight_text %}}card[name]{{% /highlight_text %}} is mandatory for Mastercard payment of winnings (gaming/gambling merchants).
Depending on card scheme and merchant category, the name on the card might be necessary for approval of credits.
