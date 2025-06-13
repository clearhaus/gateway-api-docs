---
title: "Credits"
date: 2022-04-13T12:37:22+02:00
anchor: "credits"
weight: 180
---
#### Credits
To payout (e.g. winnings and not refunds) money to a cardholder’s bank account you make a new credit resource.
```shell
POST https://gateway.clearhaus.com/credits
```

Information about the recipient is required for credits under certain circumstances to be compliant with card scheme rules. See [Recipient information](#credit_recipient_information).

##### Parameters
{{% description_list %}}
{{% description_term %}}amount{{% regex %}}[1-9][0-9]{,8}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Amount in minor units of given currency (e.g. cents if in Euro).
{{% /description_details %}}

{{% description_term %}}currency{{% regex %}}[A-Z]{3}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}[3-letter currency code](/currencies). (Some exponents differ from ISO 4217.) 
{{% /description_details %}}

{{% description_term %}}text_on_statement{{% regex %}}[\x20-\x7E]{2,22} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters) {{% /regex %}}{{% /description_term %}}
{{% description_details %}}Text that will be placed on cardholder’s bank statement.

{{% regex_optional %}}May not be all digits, all same character, or all sequential characters (e.g. “abc”).{{% /regex_optional %}}
{{% regex_optional %}}Optional, defaults to account's descriptor.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}reference{{% regex %}}[\x20-\x7E]{1,30} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters) {{% /regex %}}{{% /description_term %}}
{{% description_details %}} A reference to an external object, such as an order number.

{{% regex_optional %}}Optional{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}card[pan] {{% regex %}}[0-9]{12,19}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Primary account number of card to charge.
{{% /description_details %}}

{{% description_term %}}card[expire_month] {{% regex %}}[0-9]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Expiry month of card to charge.
{{% /description_details %}}

{{% description_term %}}card[expire_year] {{% regex %}}20[0-9]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Expiry year of card to charge.
{{% /description_details %}}

{{% description_term %}}card[csc] {{% regex %}} [0-9]{3}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Card Security Code.
{{% regex_optional %}}Optional.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}{{% strike %}}card[name]{{% /strike %}} {{% regex %}}[A-Za-z0-9 ]{1,30}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}
{{% regex_optional %}}Deprecated, see [Recipient information](#credit_recipient_information) instead.{{% /regex_optional %}}
{{% regex_optional %}}Mutually exclusive with `recipient`.{{% /regex_optional %}}
{{% /description_details %}}

{{% /description_list %}}

{{% notice %}}
**Notice**: Implicitly, `initiator` is `merchant` and `credential_on_file` is `use`.
{{% /notice %}}
