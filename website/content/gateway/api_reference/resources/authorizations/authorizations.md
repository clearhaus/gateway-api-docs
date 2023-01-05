---
title: "authorizations"
date: 2022-04-13T12:37:22+02:00
anchor: "authorizations"
weight: 105
---
#### Authorizations
To reserve money on a cardholder’s bank account you make a new authorization resource.
```shell
POST https://gateway.clearhaus.com/authorizations
```
Authorizations can be created using different payment methods: [`card`](#method-card), [`applepay`](#method-applepay), [`googlepay`](#method-googlepay), [`mobilepayonline`](#method-mobilepayonline), [`moto`](#method-moto), [`token`](#method-token) and [`vipps`](#method-vipps). Exactly one payment method must be used.

##### Parameters
{{% description_list %}}
{{% description_term %}}amount {{% regex %}}(0|[1-9][0-9]{,8}){{% /regex %}} {{% /description_term %}}
{{% description_details %}}Amount in minor units of given currency (e.g. cents if in Euro).
{{% /description_details %}}

{{% description_term %}}currency {{% regex %}}[A-Z]{3}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}[3-letter currency code](/currencies). (Some exponents differ from ISO 4217.)
{{% /description_details %}}

{{% description_term %}} credential\_on\_file {{% regex %}}(store|use){{% /regex %}}{{% /description_term %}}
{{% description_details %}} Indicate if the payment credential (e.g. PAN and expiry) will be stored for future use where the payment credential is not provided by the cardholder but collected from (encrypted) storage.

`store`: The payment credential will be stored; it may only be stored if the authorization is approved.

`use`: The payment credential has already been stored and is now being used.

Default:

- `use`, if `initiator` is `merchant` (`store` is invalid),
- `store` if the authorization is first-in-series.

{{% regex_optional %}}Optional{{% /regex_optional %}}

{{% /description_details %}}

{{% description_term %}}initiator {{% regex %}}(cardholder|merchant){{% /regex %}}{{% /description_term %}}

{{% description_details %}}The initiator of the authorization. An authorization is initiated by the cardholder if the cardholder decided the transaction should be created. This is regardless of whether a stored payment credential is being used.
For compliance reasons there should be a previously approved transaction (for the combination of card and merchant) where `credential_on_file=store` before `initiator` may be `merchant`.

Default:
- `merchant`, if the authorization is subsequent-in-series (`cardholder` is invalid),
- `cardholder`, otherwise.

{{% regex_optional %}}Optional{{% /regex_optional %}}
{{% /description_details %}}


{{% description_term %}}ip {{% regex %}}[0-9.a-fA-F:]{3,45}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Cardholder’s IP address. It must be a valid v4 or v6 address.

{{% regex_optional %}}Optional{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}reference {{% regex %}}[\x20-\x7E]{1,30} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters){{% /regex %}}{{% /description_term %}}
{{% description_details %}}A reference to an external object, such as an order number.

{{% regex_optional %}}Optional{{% /regex_optional %}}
{{% /description_details %}}



{{% description_term %}}series[type] {{% regex %}}(recurring|unscheduled){{% /regex %}}{{% /description_term %}}
{{% description_details %}}The type of series. This parameter is used exactly when initiating a series. To create a subsequent-in-series authorization use `series[previous][...]`.

- `recurring`\: A series of transactions where the cardholder has explicitly agreed that the merchant may repeatedly charge the cardholder at regular, predetermined intervals that may not exceed 1 year.
- `unscheduled`\: A series of transactions where the cardholder has explicitly agreed that the merchant may repeatedly charge the cardholder at non-predetermined times, e.g. based on cardholder usage.

{{% regex_optional %}}Conditional.{{% /regex_optional %}}
Cannot be present if `series[previous]` is present.

{{% /description_details %}}


{{% description_term %}}series[previous][id] {{% regex %}}[:UUIDv4:]{{% /regex %}}{{% /description_term %}}
{{% description_details %}}The Clearhaus authorization ID as a reference to the latest approved authorization in the series.
This parameter is used for a subsequent-in-series. To create a first-in-series authorization use  `series[type] `.
Can be used only with payment method  `card`.
If the latest approved authorization in the series was not processed via Clearhaus, after obtaining explicit approval from Clearhaus, you can provide raw scheme values; see [Scheme reference to series](#scheme-reference-to-series).

Conditional. Cannot be present if  `series[type]` is present.
{{% /description_details %}}

{{% description_term %}}text_on_statement {{% regex %}}[\x20-\x7E]{2,22} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters){{% /regex %}}{{% /description_term %}}
{{% description_details %}}Text that will be placed on cardholder’s bank statement.

{{% regex_optional %}}May not be all digits, all same character, or all sequential characters (e.g. “abc”){{% /regex_optional %}}

{{% regex_optional %}}Optional, defaults to account's descriptor{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}~~recurring~~{{% regex %}}(true|false){{% /regex %}}{{% /description_term %}}
{{% description_details %}}Deprecated! Please use `series`.

{{% regex_optional %}}~~Optional~~{{% /regex_optional %}} 
{{% regex_optional %}}~~Cannot be used with `series` or `initiator`.~~{{% /regex_optional %}}
{{% /description_details %}}
{{% /description_list %}}
{{% notice %}}
**Notice:** When `recurring` is used, Clearhaus automatically identifies if there was a previous-in-series and if that is the case uses the level of authentication (CSC, 3-D Secure, etc.) to conclude if the payment is a first-in-in-series or a subsequent-in-series recurring.
{{% /notice %}}
{{% notice %}}
**Notice:** Since `series[type]` cannot be supplied together with `series[previous]`, the type of a series cannot change.
{{% /notice %}}
