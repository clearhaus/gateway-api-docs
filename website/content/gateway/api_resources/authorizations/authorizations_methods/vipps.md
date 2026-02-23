---
title: "vipps"
date: 2022-04-13T12:37:22+02:00
anchor: "method-vipps"
weight: 245
---
### Method: vipps

{{% description_list %}}
{{% description_term %}}vipps[pan]  {{% regex %}}[0-9]{12,19}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}
Primary account number of card to charge.
{{% /description_details %}}

{{% description_term %}}vipps[expire_month]  {{% regex %}}[0-9]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}
Expiry month of card to charge.
{{% /description_details %}}

{{% description_term %}}vipps[expire_year]  {{% regex %}}[0-9]{4}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}
Expiry year of card to charge.
{{% /description_details %}}

{{% description_term %}}vipps[payment_token]  {{% regex %}}[\:json\:]{{% /regex %}}{{% /description_term %}}
{{% description_details %}}
Full response serialized as JSON, supplied as a string. 
Example: `{"pspTransactionId":"string","networkToken":{"cryptogram": "string",...},...}`
{{% regex_optional %}}Optional{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}vipps[3dsecure]  {{% regex %}}dictionary{{% /regex %}}{{% /description_term %}}
{{% description_details %}}
See [Authentication: [3dsecure]](#authentication-3dsecure). 
{{% regex_optional %}}Optional{{% /regex_optional %}}
{{% /description_details %}}


{{% /description_list %}}

{{% notice %}}
**Notice**: Signing is required to use the `vipps` payment method. 
{{% /notice %}}
