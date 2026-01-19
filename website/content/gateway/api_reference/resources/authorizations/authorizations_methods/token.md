---
title: "token"
date: 2022-04-13T12:37:22+02:00
anchor: "method-token"
weight: 135
---
#### Method: token

Token frameworks supported:

* `clicktopay`: Click to Pay
* `token`: Visa and Mastercard


Requirement of some parameters depends on the initiator of the transaction; a parameter might be required for cardholder-initiated transactions (CITs) and otherwise optional. See the details for each parameter.

{{% notice %}}
**Notice**: Signing is required to use the `token` payment method.
{{% /notice %}}

Token payment method for both For both Visa Token Service (VTS) and Mastercard Digital Enablement Service (MDES)
The token required values are found in: 
- the VTS provision token response.
- the MDES `transact` response
- the SCOF Secure Card on File  `checkout` response.

{{% description_list %}}
{{% description_term %}}type {{% regex %}}token{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Payment method type. Must be set to `token`.
| Response |  condition  |
| token | if its a card token |
| clicktopay | if its clickyopay

{{% /description_details %}}

{{% description_term %}}tan {{% regex %}}[0-9]{12,19}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Token Account Number (TAN) of the token to charge.

| Response | Found in  |
| ------   | --------- |
| VTS      | `tokenInfo.encTokenInfo`    |
| MDES     | `encryptedPayload.encryptedData.accountNumber`    |
| SCOF     | `encryptedPayload.token.paymentToken`     |
| clicktopay | `tan` |
{{% /description_details %}}

{{% description_term %}}expire_month {{% regex %}}[0-9]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Expiry month of token to charge.

| Response | Found in  |
| ------   | --------- |
| VTS      | `tokenInfo.expirationDate.month`    |
| MDES     | `encryptedPayload.encryptedData.applicationExpiryDate `   |
| SCOF     | `encryptedPayload.token.tokenExpirationMonth`     |
| clicktopay | `expire_month` |
{{% /description_details %}}


{{% description_term %}}expire_year {{% regex %}}20[0-9]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Expiry year of token to charge.

| Response | Found in  |
| ------   | --------- |
| VTS      | `tokenInfo.expirationDate.year`    |
| MDES     | `encryptedPayload.encryptedData.applicationExpiryDate `   |
| SCOF     | `encryptedPayload.token.tokenExpirationYear`     |
| clicktopay | `expire_year` |
{{% /description_details %}}

{{% description_term %}}eci {{% regex %}}0[57]{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Electronic Commerce Indicator.


| Response | Found in  | Required for CITs |
| ------   | --------- | ---- |
| VTS      | `cryptogramInfo.eci`    | Yes, otherwise optional (defaults to `07`) |
| MDES     | N/A | |
| SCOF     | N/A | |
| clicktopay | Zero-padded e-commerce indicator from token flow | Required for Visa CITs |
{{% /description_details %}}


{{% description_term %}}tav {{% regex %}}[:base64:]{28}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Token Authentication Value (TAV) also know as token cryptogram.

Visa specific name: Token Authentication Verification Value (TAVV).

Mastercard specific name: Digital Secure Remote Payments (DSRP) cryptogram.
For Mastercard only DSRP cryptograms are supported. The value must start with `[A-P]` to be a DSRP cryptogram.



| Response | Found in  | Required for CITs |
| ------   | --------- | ---- |
| VTS      | `cryptogramInfo.eci`    | Yes; otherwise optional. |
| MDES     | `encryptedPayload.encryptedData.de48se43Data` | Yes. For MITs it shall only be included on the first, tokenized transaction or if there is a change to the token|
| SCOF     | `encryptedPayload.dynamicData.dynamicDataValue` | Yes. For MITs it shall only be included on the first, tokenized transaction or if there is a change to the token|
| clicktopay | `tav` | Yes |
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

{{% description_term %}}3dsecure[v2] {{% regex %}}dictionary{{% /regex %}}{{% /description_term %}}
{{% description_details %}}See [Authentication: [3dsecure][v2]](#authentication-3dsecure-v2).
{{% regex_optional %}}Optional{{% /regex_optional %}}
{{% /description_details %}}
{{% /description_list %}}


