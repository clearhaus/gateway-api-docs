---
title: "Repeatedly_reserve_money"
date: 2022-04-13T12:37:22+02:00
anchor: "repeatedly_reserve_money"
weight: 75
---
### Repeatedly reserve money
A first-in-series payment is created by making an authorization and marking it as either a {{% highlight_text %}}recurring{{% /highlight_text %}} or {{% highlight_text %}}unscheduled{{% /highlight_text %}} series. For instance, a first-in-series recurring payment could be made this way:
```shell
curl -X POST \
  https://gateway.test.clearhaus.com/authorizations \
  -u <your-api-key>:  \
  -d "amount=2050"    \
  -d "currency=EUR"   \
  -d "series[type]=recurring"     \
  -d "card[pan]=4111111111111111" \
  -d "card[expire_month]=06"      \
  -d "card[expire_year]=2026"     \
  -d "card[csc]=123"              \
  --data-urlencode "card[3dsecure][v2][rreq]=<some-rreq-value>" \
  -H "Signature: <signing-api-key> RS256-hex <signature>"
```
Example response (snippet):
```json
{
    "id": "1b722683-92ad-4c6b-85da-e119d550670d",
    "status": { "code": 20000 },
    "series": {
        "type": "recurring",
        "tid": "481048839682954"
    }
}
```
This should be followed by a capture.
Subsequent-in-series authorizations initiated by the merchant are made similarly, however, CSC is not included, and the previous-in-series is referenced, e.g.:
```shell
curl -X POST \
  https://gateway.test.clearhaus.com/authorizations \
  -u <your-api-key>:  \
  -d "amount=2050"    \
  -d "currency=EUR"   \
  -d "series[previous][id]=1b722683-92ad-4c6b-85da-e119d550670d" \
  -d "card[pan]=4111111111111111" \
  -d "card[expire_month]=06"      \
  -d "card[expire_year]=2026"     \
  -H "Signature: <signing-api-key> RS256-hex <signature>"
```
A first-in-series authorization can also be made using the {{% highlight_text %}}applepay{{% /highlight_text %}}, {{% highlight_text %}}googlepay{{% /highlight_text %}} or {{% highlight_text %}}mobilepayonline{{% /highlight_text %}} payment methods.

A subsequent-in-series authorization must be made using the {{% highlight_text %}}card{{% /highlight_text %}} payment method with the exact card details of the referenced previous-in-series authorization.

Any first-in-series authorization must be made with strong customer authentication (SCA) regardless of the authorization amount (when the cardholder is in scope for SCA).
