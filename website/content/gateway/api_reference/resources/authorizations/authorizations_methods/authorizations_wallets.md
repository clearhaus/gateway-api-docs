---
title: "authorizations_wallets"
date: 2022-04-13T12:37:22+02:00
anchor: "method-wallets"
weight: 115
---
#### Payment wallets

Payment wallets supported:

* `applepay`: Apple Pay
* `googlepay`: Google Pay

{{% notice %}}
**Notice**: Signing is required to use the `applepay` and `googlepay` payment methods.
{{% /notice %}}

Apple Pay requires the payment details (PAN, expiry, etc.) of the payment token to be decrypted by a symmetric key. Your systems must derive this symmetric key using the payment token's ephemeral public key, the merchant's private key and the merchant ID. For this, we refer to [our reference implementation](https://github.com/clearhaus/pedicel) written in Ruby; see [Apple's documentation for the `PaymentToken` object](https://developer.apple.com/library/content/documentation/PassKit/Reference/PaymentTokenJSON/PaymentTokenJSON.html) for more information.

To accept a payment using Google Pay, the complete payment token, recipient ID and derived shared secret, are required. Please refer to the [official documentation](https://developers.google.com/pay/api/web/guides/resources/payment-data-cryptography). Only protocol version `ECv2` is supported.

{{% description_list %}}
{{% description_term %}}type {{% regex %}}applepay|googlepay{{% /regex %}}{{% /description_term %}}
{{% description_details %}}
| Type | description |
| ---- | ----------- |
| applepay | Apple Pay |
| googlepay | Google Pay
{{% /description_details %}}

{{% description_term %}}payment_token {{% regex %}}[\:json\:]{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Full payment token serialized as JSON, supplied as a string.

| Wallet | Description |
| ------ | ----------- |
| applepay | Full `PKPaymentToken` serialized as JSON. Example: `{"paymentData":{"version":"EC_v1","data":"",...},"paymentMethod":{...},...}` |
| googlepay | Raw payment method token as received in response from Google. UTF-8 encoded serialization of a JSON dictionary. |
{{% /description_details %}}

{{% description_term %}}token {{% regex %}}[\:json\:]{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Raw payment method token as received in response from Google. UTF-8 encoded serialization of a JSON dictionary.

{{% regex_optional %}}Optional. Only applicable for `googlepay` payments.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}symmetric_key {{% regex %}}[\:hex\:]{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Symmetric AES key (unique per transaction) that can decrypt `data` from the `PKPaymentToken`.

{{% regex_optional %}}Only applicable for `applepay` payments.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}shared_key {{% regex %}}[\:base64\:]{{% /regex %}}{{% /description_term %}}
{{% description_details %}}The shared secret derived from the ephemeral public key and your private key.

{{% regex_optional %}}Only applicable for `googlepay` payments.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}recipient_id {{% regex %}}[\x21-\x7E]+ [ASCII printable characters](http://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters) excluding space {{% /regex %}}{{% /description_term %}}
{{% description_details %}}ID assigned by Google. Prepend it with either `merchant:` or `gateway:` depending on ID type.

{{% regex_optional %}}Only applicable for `googlepay` payments. The `recipient_id` for `googlepay` in the test environment is `merchant:12345678901234567890`.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}3dsecure {{% regex %}}dictionary{{% /regex %}}{{% /description_term %}}
{{% description_details %}}See [Authentication: [3dsecure]](#authentication-3dsecure).

{{% regex_optional %}}Optional. Only applicable for `googlepay` payments.{{% /regex_optional %}}
{{% /description_details %}}

{{% /description_list %}}
{{% notice %}}
**Notice**: An authorization made with `applepay` is strongly authenticated (SCA in PSD2).

**Notice**: An authorization made with `applepay` may be 3-D Secured to some degree or not at all; this is indicated by the `eciIndicator` of the `payment_token`.

**Notice**: An authorization made with `applepay` cannot be a subsequent-in-series authorization.

**Notice**: An authorization made with `googlepay` is strongly authenticated (SCA in PSD2) if `authMethod` is `CRYPTOGRAM_3DS` and the [Google Pay guidelines for SCA](https://developers.google.com/pay/api/android/guides/resources/sca) have been followed. If `authMethod` is `PAN_ONLY`, a 3-D Secure flow is required for SCA and the resulting ARes/RReq must be supplied in the `3dsecure` sub-dictionary.

**Notice**: To obtain liability shift for a `googlepay` token with `authMethod` `CRYPTOGRAM_3DS` the `ECI` must be `02` or empty for Mastercard and `05` for Visa. For other values, a 3-D Secure flow is required for liability shift.

**Notice**: An authorization made with `googlepay` cannot be a subsequent-in-series authorization.
{{% /notice %}}
