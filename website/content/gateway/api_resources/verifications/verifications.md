---
title: "Verifications"
date: 2026-08-31T12:00:00+02:00
anchor: "verifications"
weight: 282
---
## Verifications
To check whether a cardholder-supplied name matches the name held by the issuing bank for a card, you submit a verification request. Unlike authorizations, captures, and debits, a verification does not move any funds and is not tied to any other transaction — it can be requested at any time, independently, for example right after collecting card details and before ever charging or paying out to the card.

```shell
POST https://gateway.clearhaus.com/verifications
```

{{% notice %}}
**Notice**: Verifications must be enabled for your account before this endpoint can be used. Contact Clearhaus support to have it enabled.
{{% /notice %}}

{{% notice %}}
**Notice**: The result is advisory only. Clearhaus does not decline or otherwise act on the result — it is returned so you can apply your own risk logic.
{{% /notice %}}

##### Parameters
{{% description_list %}}
{{% description_term %}}can[pan] {{% regex %}}[0-9]{12,19}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Primary account number (PAN) of the card to verify.

{{% regex_optional %}}Exactly one of `can[pan]` or `can[token]` must be given.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}can[token] {{% regex %}}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Token of the card to verify.

{{% regex_optional %}}Exactly one of `can[pan]` or `can[token]` must be given.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}cardholder_name[first_name] {{% regex %}}[\x20-\x7E]{1,35}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}First name of the cardholder as you have it on file, to be matched against the name held by the issuing bank.
{{% /description_details %}}

{{% description_term %}}cardholder_name[middle_name] {{% regex %}}[\x20-\x7E]{1,35}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Middle name of the cardholder as you have it on file.

{{% regex_optional %}}Optional{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}cardholder_name[last_name] {{% regex %}}[\x20-\x7E]{1,35}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Last name of the cardholder as you have it on file, to be matched against the name held by the issuing bank.
{{% /description_details %}}

{{% /description_list %}}

We determine whether the card is a Visa or Mastercard card and route the request accordingly; you do not need to specify a scheme, and the response is normalized to the same shape regardless of which scheme was used.
