---
title: "Captures"
date: 2022-04-13T12:37:22+02:00
anchor: "captures"
weight: 260
---
## Captures
To transfer money from a cardholder’s bank account to your merchant bank account you make a new capture resource. You can make multiple captures for an authorization transaction.
```shell
POST https://gateway.clearhaus.com/authorizations/:id/captures
```
##### Parameters
{{% description_list %}}
{{% description_term %}}amount{{% regex %}}[1-9][0-9]{,8}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Amount in minor units of given currency (e.g. cents if in Euro). The full or remaining amount will be withdrawn if no amount is given. 
{{% regex_optional %}}Optional{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}text_on_statement{{% regex %}}[\x20-\x7E]{2,22} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters) {{% /regex %}}{{% /description_term %}}
{{% description_details %}}Text that will be placed on cardholder's bank statement. Overrides `text_on_statement` from authorization.

{{% regex_optional %}} May not be all digits, all same character, or all sequential characters (e.g. “abc”){{% /regex_optional %}}
{{% regex_optional %}}Optional{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}merchant_url {{% regex %}}[\x20-\x7E]{1,60} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters){{% /regex %}}{{% /description_term %}}
{{% description_details %}}Merchant's website address. Overrides `merchant_url` from authorization.

{{% regex_optional %}}Internationalised domain names and non-ASCII paths must be submitted in their ASCII form{{% /regex_optional %}}

{{% regex_optional %}}Optional{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}merchant_phone_number {{% regex %}}[\x20-\x7E]{1,16} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters){{% /regex %}}{{% /description_term %}}
{{% description_details %}}Merchant's customer service phone number. Overrides `merchant_phone_number` from authorization.

{{% regex_optional %}}Optional{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}travel{{% regex %}}dictionary{{% /regex %}}{{% /description_term %}}
{{% description_details %}}See [Travel data](#travel-data).
{{% regex_optional %}}Optional{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}marketplace[interregional_retailer]{{% regex %}}(true|false){{% /regex %}}{{% /description_term %}}
{{% description_details %}}Indicates whether or not a marketplace retailer outside EEA, Gibraltar, and the UK is involved in the transaction.

{{% regex_optional %}}Required if the merchant is a marketplace.{{% /regex_optional %}}
{{% /description_details %}}

{{% /description_list %}}

{{% notice %}}
**Notice**: A capture cannot be made if the authorization is 180 days old or older.
{{% /notice %}}
{{% notice %}}
**Notice**: For Visa transactions, amounts equivalent to less than USD 0.005 will be declined.
{{% /notice %}}
