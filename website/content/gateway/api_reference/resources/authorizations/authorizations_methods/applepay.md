---
title: "applypay"
date: 2022-04-13T12:37:22+02:00
anchor: "method-applepay"
weight: 115
---
#### Method: applepay

Apple Pay requires the payment details (PAN, expiry, etc.) of the payment token to be decrypted by a symmetric key. Your systems must derive this symmetric key using the payment token’s ephemeral public key, the merchant’s private key and the merchant ID. For this, we refer to [our reference implementation](https://github.com/clearhaus/pedicel) written in Ruby; see [Apple’s documentation for the `PaymentToken` object](https://developer.apple.com/library/content/documentation/PassKit/Reference/PaymentTokenJSON/PaymentTokenJSON.html) for more information.

{{% description_list %}}
{{% description_term %}}applepay[payment_token] {{% regex %}}[\:json\:]{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Full ` PKPaymentToken `serialized as JSON, supplied as a string.

Example: `{"paymentData":{"version":"EC_v1","data":"",...},"paymentMethod":{...},...}`
{{% /description_details %}}

{{% description_term %}}applepay[symmetric_key] {{% regex %}}[\:hex\:]{{% /regex %}}{{% /description_term %}}
{{% description_details %}}
Symmetric AES key (unique per transaction) that can decrypt `data` from the `PKPaymentToken`. 
{{% /description_details %}}


{{% /description_list %}}
{{% notice %}}
**Notice**: Signing is required to use the `applepay` payment method.

**Notice**: An authorization made with `applepay` is strongly authenticated (SCA in PSD2).

**Notice**: An authorization made with `applepay` may be 3-D Secured to some degree or not at all; this is indicated by the `eciIndicator` of the `applepay[payment_token]`.

**Notice**: An authorization made with `applepay` cannot be a subsequent-in-series authorization. 

{{% /notice %}}
