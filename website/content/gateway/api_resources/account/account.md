---
title: "Account"
date: 2022-04-13T12:37:22+02:00
anchor: "account"
weight: 285
---
## Account
The account resource holds basic merchant account information. Only `HTTP GET` is supported for this endpoint.
```shell
GET https://gateway.clearhaus.com/account
```
##### Response parameters

{{% description_list %}}
{{% description_term %}}merchant_id{{% regex %}}[0-9]{15}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Used for 3-D Secure and also for reference when talking to our support staff. For 3-D Secure it is important to represent this number with leading zeros. 
{{% /description_details %}}

{{% description_term %}}descriptor{{% regex %}}[\x20-\x7E]{0,22} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters) {{% /regex %}}{{% /description_term %}}
{{% description_details %}}The default `text_on_statement`.
{{% /description_details %}}

{{% description_term %}}name{{% regex %}}[\x20-\x7E]{0,20} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters) {{% /regex %}}{{% /description_term %}}
{{% description_details %}}Merchant company name. 
{{% /description_details %}}

{{% description_term %}}country{{% regex %}}[A-Z]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}ISO 3166-1 2-letter country code for merchant company. 
{{% /description_details %}}

{{% description_term %}}currency{{% regex %}}[A-Z]{3}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}ISO 4217 3-letter currency code for merchant funding currency.
{{% /description_details %}}

{{% description_term %}}mcc{{% regex %}}[0-9]{4}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Merchant category code. 
{{% /description_details %}}

{{% description_term %}}acquirer{{% /description_term %}}
{{% description_details %}}Used for 3-D Secure. 
{{% /description_details %}}

{{% description_term %}}transaction_rules{{% regex %}}[\x20-\x7E]*{{% /regex %}}{{% /description_term %}}
{{% description_details %}}The processing rules that the merchant’s transactions must adhere to. 
{{% /description_details %}}

{{% /description_list %}}
