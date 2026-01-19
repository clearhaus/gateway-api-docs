---
title: "token"
date: 2022-04-13T12:37:22+02:00
anchor: "method-token"
weight: 135
---
#### Payment methods

Payment methods supported:

* `applepay`: Apple Pay (raw values)
* `card`: Card payment
* `clicktopay`: Click to Pay
* `mobilepayonline`: MobilePay Online
* `moto`: Mail Order/Telephone Order
* `token`: Visa and Mastercard
* `vipps`: Vipps


Requirement of some parameters depends on the initiator of the transaction; a parameter might be required for cardholder-initiated transactions (CITs) and otherwise optional. See the details for each parameter.

{{% notice %}}
**Notice**: Signing is required to use the `token`, `moto`, `mobilepayonline`, `vipps`, and `applepay` payment methods.
{{% /notice %}}

For token payments, the required values are found in: 
- the VTS provision token response.
- the MDES `transact` response
- the SCOF Secure Card on File  `checkout` response.

{{% description_list %}}
{{% description_term %}}type {{% regex %}}applepay|card|clicktopay|mobilepayonline|moto|token|vipps{{% /regex %}}{{% /description_term %}}
{{% description_details %}}
| Type | description |
| ---- | ----------- |
| applepay | Apple Pay (raw values) |
| card | Card payment, not tokenized |
| clicktopay | Click to pay |
| mobilepayonline | MobilePay Online |
| moto | Mail Order/Telephone Order |
| token | Token payments |
| vipps | Vipps
{{% /description_details %}}

{{% description_term %}}account_number {{% regex %}}[0-9]{12,19}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Account number. For card payments, this is the Primary Account Number (PAN). For token payments, this is the Token Account Number (TAN).

If `payment_token` parameter is included for `mobilepayonline`, the account_number must be a Token PAN.

| Response | Found in  |
| ------   | --------- |
| VTS      | `tokenInfo.encTokenInfo`    |
| MDES     | `encryptedPayload.encryptedData.accountNumber`    |
| SCOF     | `encryptedPayload.token.paymentToken`     |
| clicktopay | `account_number` |
| card | Card PAN |
| moto | Card PAN |
| mobilepayonline | Card PAN (or Token PAN if payment_token is included) |
| vipps | Card PAN |
| applepay | Card PAN (from decrypted payment token) |
{{% /description_details %}}

{{% description_term %}}expire_month {{% regex %}}[0-9]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Expiry month of card or token to charge.

| Response | Found in  |
| ------   | --------- |
| VTS      | `tokenInfo.expirationDate.month`    |
| MDES     | `encryptedPayload.encryptedData.applicationExpiryDate `   |
| SCOF     | `encryptedPayload.token.tokenExpirationMonth`     |
| clicktopay | `expire_month` |
| card | Card expiry month |
| moto | Card expiry month |
| mobilepayonline | Card expiry month |
| vipps | Card expiry month |
| applepay | Card expiry month (from decrypted payment token) |
{{% /description_details %}}


{{% description_term %}}expire_year {{% regex %}}20[0-9]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Expiry year of card or token to charge.

| Response | Found in  |
| ------   | --------- |
| VTS      | `tokenInfo.expirationDate.year`    |
| MDES     | `encryptedPayload.encryptedData.applicationExpiryDate `   |
| SCOF     | `encryptedPayload.token.tokenExpirationYear`     |
| clicktopay | `expire_year` |
| card | Card expiry year |
| moto | Card expiry year |
| mobilepayonline | Card expiry year |
| vipps | Card expiry year |
| applepay | Card expiry year (from decrypted payment token) |
{{% /description_details %}}

{{% description_term %}}eci {{% regex %}}[0-9]{2}|0[57]{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Electronic Commerce Indicator.

For `applepay`, this is found as `eciIndicator` in the payment token.


| Response | Found in  | Required for CITs |
| ------   | --------- | ---- |
| VTS      | `cryptogramInfo.eci`    | Yes, otherwise optional (defaults to `07`) |
| MDES     | N/A | |
| SCOF     | N/A | |
| clicktopay | Zero-padded e-commerce indicator from token flow | Required for Visa CITs |
| applepay | `eciIndicator` in payment token | Required for Visa. Otherwise optional |
{{% /description_details %}}


{{% description_term %}}tav {{% regex %}}[:base64:]{28}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Token Authentication Value (TAV) also know as token cryptogram.

Visa specific name: Token Authentication Verification Value (TAVV).

Mastercard specific name: Digital Secure Remote Payments (DSRP) cryptogram.
For Mastercard only DSRP cryptograms are supported. The value must start with `[A-P]` to be a DSRP cryptogram.

For `applepay`, this is the online payment cryptogram found as `onlinePaymentCryptogram` in the payment token.

| Response | Found in  | Required for CITs |
| ------   | --------- | ---- |
| VTS      | `cryptogramInfo.eci`    | Yes; otherwise optional. |
| MDES     | `encryptedPayload.encryptedData.de48se43Data` | Yes. For MITs it shall only be included on the first, tokenized transaction or if there is a change to the token|
| SCOF     | `encryptedPayload.dynamicData.dynamicDataValue` | Yes. For MITs it shall only be included on the first, tokenized transaction or if there is a change to the token|
| clicktopay | `tav` | Yes |
| applepay | `onlinePaymentCryptogram` in payment token | Yes |
{{% /description_details %}}

{{% description_term %}}rcai {{% regex %}}[:base64:]{1..150}{{% /regex %}}{{% /description_term %}} 
{{% description_details %}}Remote Commerce Acceptor Identifier.

| Response | Found in | Required? |
| ------   | --------- | - |
| VTS      | N/A | N/A | 
| MDES     | N/A | N/A | 
| SCOF     | `customOutputData.remoteCommerceAcceptorIdentifier`| optional |
| clicktopay | N/A | N/A |

Merchant identifier such as business website URL or reverse domain name (e.g. com.example.www). The identifier must be encoded as Base64.
{{% /description_details %}}

{{% description_term %}}csc {{% regex %}}[0-9]{3}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Card Security Code.

{{% regex_optional %}}Optional when partner is trusted. Only applicable for card payments.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}payment_token {{% regex %}}[\:json\:]{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Full response serialized as JSON, supplied as a string. Required for token-based authentication.

For `mobilepayonline`: Example: `{"paymentId":"string","tokenData":{"cryptogramInfo":{...},...},...}`

For `vipps`: Example: `{"pspTransactionId":"string","networkToken":{"cryptogram": "string",...},...}`

{{% regex_optional %}}Optional. Only applicable for `mobilepayonline` and `vipps` payments.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}phone_number {{% regex %}}[\x20-\x7E]{1,15}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Phone number from where the PAN originates.

{{% regex_optional %}}Optional. Only applicable for `mobilepayonline` payments.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}3dsecure {{% regex %}}dictionary{{% /regex %}}{{% /description_term %}}
{{% description_details %}}See [Authentication: [3dsecure]](#authentication-3dsecure).
{{% regex_optional %}}Optional. For card payments, use `3dsecure`. For token payments, use `3dsecure[v2]`.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}3dsecure[v2] {{% regex %}}dictionary{{% /regex %}}{{% /description_term %}}
{{% description_details %}}See [Authentication: [3dsecure][v2]](#authentication-3dsecure-v2).
{{% regex_optional %}}Optional. For token payments, use `3dsecure[v2]`. For card payments, use `3dsecure`.{{% /regex_optional %}}
{{% /description_details %}}
{{% /description_list %}}
{{% notice %}}
**Notice:** An authorization that includes `3dsecure[v2][rreq]` and/or `csc` cannot be a subsequent-in-series authorization.

**Notice:** For `moto` payments, neither `series[]` nor `credential_on_file` is supported. Also, `initiator` cannot be `merchant`.

**Notice:** An authorization made with `mobilepayonline` with a payment token is strongly authenticated (SCA in PSD2).

**Notice:** An authorization made with `applepay` is strongly authenticated (SCA in PSD2).

**Notice:** An authorization made with `applepay` cannot be a subsequent-in-series authorization.

**Notice:** Clients using `applepay` are responsible for verifying the payment token's signature, decrypting the token's payment data, validating the format of the fields in the payment data, etc. The procedure is available in Apple Pay's [Payment Token Format Reference](https://developer.apple.com/library/archive/documentation/PassKit/Reference/PaymentTokenJSON/PaymentTokenJSON.html).
{{% /notice %}}