---
title: "Validations"
date: 2026-10-13T12:00:00+02:00
anchor: "validations"
weight: 282
---
## Validations
To check whether a cardholder-supplied name matches the name held by the issuing bank, you make a new validation resource.
```shell
POST https://gateway.clearhaus.com/validations
```
A validation (Account Name Validation) does not move any funds and is not tied to any other transaction; it can be requested at any time, for example right after collecting card details and before charging or paying out to the card.

##### Parameters
Exactly one of `card` or `token` must be used. Any other `card` or `token` fields (e.g. `csc`, `tav`, `3dsecure`) are ignored.

{{% description_list %}}
{{% description_term %}}reference {{% regex %}}[\x20-\x7E]{1,30} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters){{% /regex %}}{{% /description_term %}}
{{% description_details %}}A reference to an external object, such as a customer number.

{{% regex_optional %}}Optional{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}card[pan] {{% regex %}}[0-9]{12,19}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Primary account number of card to validate.
{{% /description_details %}}

{{% description_term %}}card[expire_month] {{% regex %}}[0-9]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Expiry month of card to validate.
{{% /description_details %}}

{{% description_term %}}card[expire_year] {{% regex %}}20[0-9]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Expiry year of card to validate.
{{% /description_details %}}

{{% description_term %}}token[tan] {{% regex %}}[0-9]{12,19}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Token Account Number (TAN) of token to validate. See [Method: token](#method-token) for where to find it; only `token[tan]`, `token[expire_month]` and `token[expire_year]` apply to validations.
{{% /description_details %}}

{{% description_term %}}token[expire_month] {{% regex %}}[0-9]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Expiry month of token to validate.
{{% /description_details %}}

{{% description_term %}}token[expire_year] {{% regex %}}20[0-9]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Expiry year of token to validate.
{{% /description_details %}}

{{% description_term %}}cardholder[name][first_name] {{% regex %}}[A-Za-z]{1,35}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}First name of the cardholder, to be matched against the name held by the issuing bank.
{{% /description_details %}}

{{% description_term %}}cardholder[name][middle_name] {{% regex %}}[A-Za-z]{1,35}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Middle name of the cardholder, to be matched against the name held by the issuing bank.

{{% regex_optional %}}Optional{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}cardholder[name][last_name] {{% regex %}}[A-Za-z]{1,35}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Last name of the cardholder, to be matched against the name held by the issuing bank.
{{% /description_details %}}
{{% /description_list %}}

##### Response parameters
{{% description_list %}}
{{% description_term %}}id{{% /description_term %}}
{{% description_details %}}Clearhaus validation ID. Validations are not stored and cannot be fetched, so unlike other resources no `_links` are returned; refer to the ID when contacting Clearhaus about a validation.
{{% /description_details %}}

{{% description_term %}}status{{% /description_term %}}
{{% description_details %}}See [Status messages](#status-message).
{{% /description_details %}}

{{% description_term %}}processed_at{{% /description_term %}}
{{% description_details %}}Timestamp of when the validation was processed.
{{% /description_details %}}

{{% description_term %}}scheme_response[visa|mastercard][payment_account_reference]{{% /description_term %}}
{{% description_details %}}Payment Account Reference (PAR) of the card, under the card's scheme.

{{% regex_optional %}}Omitted when the scheme does not return a PAR.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}name_match {{% regex %}}match|partial_match|no_match|unverified{{% /regex %}}{{% /description_term %}}
{{% description_details %}}The result of the name check:

- `match`: The name matches the name held by the issuing bank.
- `partial_match`: The name partially matches.
- `no_match`: The name does not match.
- `unverified`: The name could not be verified.

{{% regex_optional %}}Only included when `status` code is `20000`.{{% /regex_optional %}}
{{% /description_details %}}
{{% notice %}}
**Notice:** The status code and the validation result are separate. The status code reflects whether the validation was approved; `name_match` reflects whether the name matched. For example, status `20000` with `name_match`: `no_match` means the issuer approved the validation but the name did not match.
{{% /notice %}}

{{% description_term %}}name_components_match[first_name|middle_name|last_name] {{% regex %}}match|partial_match|no_match|unverified{{% /regex %}}{{% /description_term %}}
{{% description_details %}}The result of the name check for each part of the name, with the same values as `name_match`.

{{% regex_optional %}}Visa only. Only included when `status` code is `20000`. `middle_name` is omitted when no result is returned for it.{{% /regex_optional %}}
{{% /description_details %}}
{{% /description_list %}}

{{% notice %}}
**Notice**: Only Visa and Mastercard cards are supported; for any other card scheme the validation is rejected with status code `40111`.

**Notice**: Account Name Validation must be enabled for your account before this endpoint can be used. If it is not enabled, the validation is rejected with status code `40000` and the message `account name validation not enabled`. Contact Clearhaus to have it enabled.

**Notice**: Signing is required to make a validation.

**Notice**: Unlike other resources, a processed validation is returned with HTTP status `200 OK` rather than `201 Created`. A validation rejected before it is processed (e.g. because of an invalid parameter, a missing signature or an unsupported card) is returned with `400 Bad Request`.
{{% /notice %}}

See [Validate account name](#validate_account_name) for an example.
