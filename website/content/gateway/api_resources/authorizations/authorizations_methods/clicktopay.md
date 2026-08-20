---
title: "clicktopay"
date: 2025-07-06T10:23:00+02:00
anchor: "method-clicktopay"
weight: 239
---
### Method: clicktopay

Click to Pay payment method for both Visa and Mastercard CITs.

A Click to Pay authorization can be created using one of the two mutually exclusive interfaces. One by providing payloads and the other by providing raw values.

#### Click to Pay payload interface:

{{% description_list %}}
{{% description_term %}}clicktopay[payload] {{% regex %}}[\:json\:] {{% /regex %}} {{% /description_term %}}
{{% description_details %}} Full decrypted payload serialized as JSON, supplied as a string. The encrypted payload can be found in the `encryptedPayload` field in the Click to Pay checkout response.

Example: `{"token":{"paymentToken":"",...}, "dynamicData":[{...}],...}`
{{% /description_details %}}

{{% description_term %}}clicktopay[assurance_data] {{% regex %}}[\:json\:] {{% /regex %}} {{% /description_term %}}
{{% description_details %}} Full assurance data serialized as JSON, supplied as a string. The assurance data can be found in the `assuranceData` field in the Click to Pay checkout response.

Example: `{"verificationData":[{"verificationType":"", "verificationMethod":"", "methodResults":{...},...},...], "eci":"",...}`

{{% regex_optional %}}Required when 3‑D Secure authentication was performed `ONBEHALF`. Required for Visa tokens if no `[3dsecure]` with an `eci` is provided.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}clicktopay[3dsecure] {{% regex %}}dictionary{{% /regex %}}{{% /description_term %}}
{{% description_details %}}See [Authentication: [3dsecure]](#authentication-3dsecure).
{{% regex_optional %}}Optional.{{% /regex_optional %}}
{{% /description_details %}}
{{% /description_list %}}

#### Click to Pay raw interface

{{% description_list %}}

{{% description_term %}}clicktopay[can] {{% regex %}}[0-9]{12,19}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Cardholder Account Number (CAN) of the card or token to charge.
{{% regex_optional %}} Required if `tan` is not present. Cannot be present if `tan` is present.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}clicktopay[tan] {{% regex %}}[0-9]{12,19}{{% /regex %}} <span class="deprecated-badge">Deprecated</span> {{% /description_term %}}
{{% description_details %}} Token Account Number (TAN) of the token to charge.
{{% regex_optional %}} Required if `can` is not present. Cannot be present if `can` is present.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}clicktopay[expire_month] {{% regex %}}[0-9]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Expiry month of the card or token to charge.
{{% /description_details %}}

{{% description_term %}}clicktopay[expire_year] {{% regex %}}20[0-9]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Expiry year of the card or token to charge.
{{% /description_details %}}

{{% description_term %}}clicktopay[tav] {{% regex %}}[:base64:]{28}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Token authentication value, also known as cryptogram.
{{% regex_optional %}}Required when `can` is a token or when `tan` is provided.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}clicktopay[eci] {{% regex %}}0[0-9]{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Zero-padded e-commerce indicator from Click to Pay flow.
{{% regex_optional %}}Required for Visa tokens if no `eci` from a 3-D Secure flow is present in `[onbehalf][eci]` or `[3dsecure]`.{{% /regex_optional %}}
{{% /description_details %}}

If 3-D Secure authentication was performed `ONBEHALF` as part of the Click to Pay checkout flow, provide the authentication data in the `[onbehalf][...]` field:

{{% description_term %}}clicktopay[onbehalf][trans_status] {{% regex %}}[A-Z]{{% /regex %}}{{% /description_term %}}
{{% description_details %}} 3-D Secure trans status from a 3-D Secure `ONBEHALF` flow.
{{% regex_optional %}} Optional. Provide it whenever the 3-D Secure result includes a trans status. {{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}clicktopay[onbehalf][eci] {{% regex %}}0[0-9]{{% /regex %}}{{% /description_term %}}
{{% description_details %}} 3-D Secure eci from a 3-D Secure `ONBEHALF` flow.
{{% regex_optional %}} Required when 3-D Secure was performed `ONBEHALF`. {{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}clicktopay[onbehalf][av] {{% regex %}}[:base64:]{28}{{% /regex %}}{{% /description_term %}}
{{% description_details %}} 3-D Secure authentication value from a 3-D Secure `ONBEHALF` flow.
{{% regex_optional %}} Required when `[onbehalf][trans_status]` is `Y` or `A`. Required for Visa when `[onbehalf][eci]` is `05` or `06`. Provide it whenever the 3-D Secure result includes an authentication value. {{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}clicktopay[onbehalf][ds_trans_id] {{% regex %}}[:UUID:]{{% /regex %}}{{% /description_term %}}
{{% description_details %}} 3-D Secure ds trans id from a 3-D Secure `ONBEHALF` flow.
{{% regex_optional %}}Required for Mastercard when 3-D Secure was performed `ONBEHALF`.{{% /regex_optional %}}
{{% /description_details %}}

If 3-D Secure authentication was performed outside of the Click to Pay checkout flow, provide the authentication data in the `[3dsecure]` field:

{{% description_term %}}clicktopay[3dsecure] {{% regex %}}dictionary{{% /regex %}}{{% /description_term %}}
{{% description_details %}}
See [Authentication: [3dsecure]](#authentication-3dsecure).
{{% /description_details %}}
{{% /description_list %}}

{{% notice %}}
**Notice**: Signing is required to use the `clicktopay` payment method.
{{% /notice %}}
