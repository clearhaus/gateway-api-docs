---
title: "secure_transactions"
date: 2022-04-13T12:37:22+02:00
anchor: "secure_transactions"
weight: 85
---
To perform a 3-D Secure version 2 transaction you make an ordinary authorization including an {{% highlight_text %}}ares{{% /highlight_text %}} or an {{% highlight_text %}}rreq{{% /highlight_text %}} value. The former is used in the following example:
```shell
curl -X POST https://gateway.test.clearhaus.com/authorizations \
     -u <your-api-key>: \
     -d "amount=2050"   \
     -d "currency=EUR"  \
     -d "ip=1.1.1.1"    \
     -d "card[pan]=4111111111111111" \
     -d "card[expire_month]=06"      \
     -d "card[expire_year]=2022"     \
     -d "card[csc]=123"              \
     --data-urlencode "card[3dsecure][v2][ares]=<some-ares-value>" \
     -H "Signature: <signing-api-key> RS256-hex <signature>"
```
Example response (snippet):
```json
{
    "id": "d0949241-1ee8-47da-a77c-d251fd9e1e88",
    "status": {
        "code": 20000
    },
    "processed_at": "2020-07-03T11:06:58+00:00",
    "3dsecure": {
        "version": "2.1.0",
        "status": "Y"
    }
}
```
{{% notice %}}
**Notice:** The response element {{% highlight_text %}}threed_secure{{% /highlight_text %}} is deprecated, please use {{% highlight_text %}}3dsecure{{% /highlight_text %}}.
{{% /notice %}}
