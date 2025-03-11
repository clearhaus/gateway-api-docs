---
title: "googlepay"
date: 2022-04-13T12:37:22+02:00
anchor: "method-googlepay"
weight: 120
---
#### Method: googlepay

To accept a payment using Google Pay, the complete payment token, recipient ID and derived shared secret, are required. Please refer to the [official documentation](https://developers.google.com/pay/api/web/guides/resources/payment-data-cryptography). Only protocol version `ECv2` is supported.

{{% description_list %}}
{{% description_term %}}googlepay[token] {{% regex %}}[\:json\:]{{% /regex %}}{{% /description_term %}}
{{% description_details %}}
Raw payment method token as received in response from Google. UTF-8 encoded serialization of a JSON dictionary.
{{% /description_details %}}

{{% description_term %}}googlepay[shared_key]  {{% regex %}}[\:base64\:]{{% /regex %}}{{% /description_term %}}
{{% description_details %}}
The shared secret derived from the ephemeral public key and your private key
{{% /description_details %}}

{{% description_term %}}googlepay[recipient_id] {{% regex %}}[\x21-\x7E]+ [ASCII printable characters](http://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters) excluding space {{% /regex %}}{{% /description_term %}}
{{% description_details %}}
ID assigned by Google. Prepend it with either `merchant:` or `gateway:` depending on ID type.
{{% /description_details %}}

{{% description_term %}}googlepay[3dsecure] {{% regex %}}dictionary{{% /regex %}}{{% /description_term %}}
{{% description_details %}}
See [Authentication: [3dsecure]](#authentication-3dsecure).
{{% regex_optional %}}Optional{{% /regex_optional %}}

{{% /description_list %}}
{{% notice %}}
**Notice**: Signing is required to use the `googlepay` payment method.

**Notice**: An authorization made with `googlepay` is strongly authenticated (SCA in PSD2) if `authMethod` is `CRYPTOGRAM_3DS` and the [Google Pay guidelines for SCA](https://developers.google.com/pay/api/android/guides/resources/sca) have been followed. If `authMethod` is `PAN_ONLY`, a 3-D Secure flow is required for SCA and the resulting ARes/RReq must be supplied in the `3dsecure` sub-dictionary.

**Notice**: To obtain liability shift for a `googlepay` token with `authMethod` `CRYPTOGRAM_3DS` the `ECI` must be `02` or empty for Mastercard and `05` for Visa. For other values, a 3-D Secure flow is required for liability shift.

**Notice**: An authorization made with `googlepay` cannot be a subsequent-in-series authorization.

**Notice**: The `recipient_id` for `googlepay` in the test environment is `merchant:12345678901234567890`.

{{% /notice %}}
