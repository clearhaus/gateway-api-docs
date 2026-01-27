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

[token[m4m]](#deprecated) and [token[vts]](#deprecated) is deprecated, but still works.

Requirement of some parameters depends on the initiator of the transaction; a parameter might be required for cardholder-initiated transactions (CITs) and otherwise optional. See the details for each parameter.

{{% notice %}}
**Notice**: Signing is required to use the `token` payment method.
{{% /notice %}}

#### Method: Click to Pay

Click to Pay token payment method for both Visa and Mastercard CITs.

{{% description_list %}}
{{% description_term %}}clicktopay[tan] {{% regex %}}[0-9]{12,19}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Token Account Number (TAN) of the token to charge.
{{% /description_details %}}

{{% description_term %}}clicktopay[expire_month] {{% regex %}}[0-9]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Expiry month of token to charge.
{{% /description_details %}}

{{% description_term %}}clicktopay[expire_year] {{% regex %}}20[0-9]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Expiry year of token to charge.
{{% /description_details %}}

{{% description_term %}}clicktopay[tav] {{% regex %}}[:base64:]{28}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Token authentication value, also known as cryptogram.
{{% /description_details %}}

{{% description_term %}}clicktopay[eci] {{% regex %}}0[57]{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Zero-padded e-commerce indicator from token flow.
{{% regex_optional %}}Required for Visa CITs.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}clicktopay[3dsecure] {{% regex %}}dictionary{{% /regex %}}{{% /description_term %}}
{{% description_details %}}See [Authentication: [3dsecure]](#authentication-3dsecure-v2).
{{% regex_optional %}}Optional{{% /regex_optional %}}
{{% /description_details %}}
{{% /description_list %}}

#### Method: token

Token payment method for both For both Visa Token Service (VTS) and Mastercard Digital Enablement Service (MDES)

The required values are found in: 
- the VTS provision token response.
- the MDES `transact` response
- the SCOF Secure Card on File  `checkout` response.

{{% description_list %}}
{{% description_term %}}token[tan] {{% regex %}}[0-9]{12,19}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Token Account Number (TAN) of the token to charge.

| Response | Found in  |
| ------   | --------- |
| VTS      | `tokenInfo.encTokenInfo`    |
| MDES     | `encryptedPayload.encryptedData.accountNumber`    |
| SCOF     | `encryptedPayload.token.paymentToken`     |
{{% /description_details %}}

{{% description_term %}}token[expire_month] {{% regex %}}[0-9]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Expiry month of token to charge.

| Response | Found in  |
| ------   | --------- |
| VTS      | `tokenInfo.expirationDate.month`    |
| MDES     | `encryptedPayload.encryptedData.applicationExpiryDate `   |
| SCOF     | `encryptedPayload.token.tokenExpirationMonth`     |
{{% /description_details %}}


{{% description_term %}}token[expire_year] {{% regex %}}20[0-9]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Expiry year of token to charge.

| Response | Found in  |
| ------   | --------- |
| VTS      | `tokenInfo.expirationDate.year`    |
| MDES     | `encryptedPayload.encryptedData.applicationExpiryDate `   |
| SCOF     | `encryptedPayload.token.tokenExpirationYear`     |
{{% /description_details %}}

{{% description_term %}}token[eci] {{% regex %}}0[57]{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Electronic Commerce Indicator.


| Response | Found in  | Required for CITs |
| ------   | --------- | ---- |
| VTS      | `cryptogramInfo.eci`    | Yes, otherwise optional (defaults to `07`) |
| MDES     | N/A | |
| SCOF     | N/A | |
{{% /description_details %}}


{{% description_term %}}token[tav] {{% regex %}}[:base64:]{28}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Token Authentication Value (TAV) also know as token cryptogram.

Visa specific name: Token Authentication Verification Value (TAVV).

Mastercard specific name: Digital Secure Remote Payments (DSRP) cryptogram.
For Mastercard only DSRP cryptograms are supported. The value must start with `[A-P]` to be a DSRP cryptogram.



| Response | Found in  | Required for CITs |
| ------   | --------- | ---- |
| VTS      | `cryptogramInfo.eci`    | Yes; otherwise optional. |
| MDES     | `encryptedPayload.encryptedData.de48se43Data` | Yes. For MITs it shall only be included on the first, tokenized transaction or if there is a change to the token|
| SCOF     | `encryptedPayload.dynamicData.dynamicDataValue` | Yes. For MITs it shall only be included on the first, tokenized transaction or if there is a change to the token|
{{% /description_details %}}

{{% description_term %}}token[rcai] {{% regex %}}[:base64:]{1..150}{{% /regex %}}{{% /description_term %}} 
{{% description_details %}}Remote Commerce Acceptor Identifier.

| Response | Found in | Required? |
| ------   | --------- | - |
| VTS      | N/A | N/A | 
| MDES     | N/A | N/A | 
| SCOF     | `customOutputData.remoteCommerceAcceptorIdentifier`| optional |

Merchant identifier such as business website URL or reverse domain name (e.g. com.example.www). The identifier must be encoded as Base64.
{{% /description_details %}}

{{% description_term %}}token[3dsecure][v2] {{% regex %}}dictionary{{% /regex %}}{{% /description_term %}}
{{% description_details %}}See [Authentication: [3dsecure][v2]](#authentication-3dsecure-v2).
{{% regex_optional %}}Optional{{% /regex_optional %}}
{{% /description_details %}}
{{% /description_list %}}


