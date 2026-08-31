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
{{% description_term %}}card[pan] {{% regex %}}[0-9]{12,19}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Primary account number of the card to verify.
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

##### Response parameters
{{% description_list %}}
{{% description_term %}}id{{% /description_term %}}
{{% description_details %}}Clearhaus verification ID.
{{% /description_details %}}

{{% description_term %}}status{{% /description_term %}}
{{% description_details %}}See [Status messages](#status-message). A `no_match` result is still a successfully processed request — `status` reflects whether the request was processed, not the outcome of the name check.
{{% /description_details %}}

{{% description_term %}}processed_at{{% /description_term %}}
{{% description_details %}}Timestamp of when the verification was processed.
{{% /description_details %}}

{{% description_term %}}name_match{{% regex %}}match|partial_match|no_match|unverified|not_supported{{% /regex %}}{{% /description_term %}}
{{% description_details %}}The result of the name check:

- `match`: The name matches the issuer's record.
- `partial_match`: The name partially matches (e.g. only part of the name matches).
- `no_match`: The name does not match.
- `unverified`: The issuer could not verify the name.
- `not_supported`: The card's issuer or scheme does not support this check. This is a normal, successful response, not an error.
{{% /description_details %}}
{{% /description_list %}}
