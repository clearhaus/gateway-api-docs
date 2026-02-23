---
title: "Repeatedly_reserve_money"
date: 2022-04-13T12:37:22+02:00
anchor: "repeatedly_reserve_money"
weight: 135
---
### Repeatedly reserve money
A first-in-series payment is created by making an authorization or debit and marking it as either a {{% highlight_text %}}recurring{{% /highlight_text %}} or {{% highlight_text %}}unscheduled{{% /highlight_text %}} series. For instance, a first-in-series recurring payment could be made this way:
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
For an authorization this should be followed by a capture.
Subsequent-in-series authorizations or debits initiated by the merchant are made similarly, however, CSC is not included, and a previous-in-series is referenced, e.g.:
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
A first-in-series authorization or debit can also be made using the {{% highlight_text %}}applepay{{% /highlight_text %}}, {{% highlight_text %}}googlepay{{% /highlight_text %}}, {{% highlight_text %}}mobilepayonline{{% /highlight_text %}}, {{% highlight_text %}}token{{% /highlight_text %}} or {{% highlight_text %}}vipps{{% /highlight_text %}} payment methods.

A subsequent-in-series authorization or debit on a token must be made using the {{% highlight_text %}}token{{% /highlight_text %}} payment method. In case it is made using a PAN the {{% highlight_text %}}card{{% /highlight_text %}} payment method must be used.

When the cardholder is in scope for strong cardholder authentication (SCA), a first-in-series authorization or debit must be made with SCA regardless of the authorization amount.
