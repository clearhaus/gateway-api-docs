---
title: "token"
date: 2022-04-13T12:37:22+02:00
anchor: "method-token"
weight: 135
---
#### Method: token

Two token frameworks are supported:

* `token[m4m]`: Mastercard Digital Enablement Service (MDES) for Merchants (M4M)
* `token[vts]`: Visa Token Service (VTS)

Requirement of some parameters depends on the initiator of the transaction; a parameter might be required for cardholder-initiated transactions (CITs) and otherwise optional. See the details for each parameter.

{{% notice %}}
**Notice**: Signing is required to use the `token` payment method.
{{% /notice %}}

#### Method: token[m4m]

The required values are found in either the MDES `transact` response or the Secure Card on File (SCOF) `checkout` response.

{{% description_list %}}
{{% description_term %}}token[m4m][tan] {{% regex %}}[0-9]{12,19}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Token Account Number (TAN) of the token to charge.

Found in `encryptedPayload.encryptedData.accountNumber` (MDES) or `encryptedPayload.token.paymentToken` (SCOF).
{{% /description_details %}}

{{% description_term %}}token[m4m][expire_month] {{% regex %}}[0-9]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Expiry month of token to charge.

Found in `encryptedPayload.encryptedData.applicationExpiryDate` (MDES) or `encryptedPayload.token.tokenExpirationMonth` (SCOF).
{{% /description_details %}}

{{% description_term %}}token[m4m][expire_year] {{% regex %}}20[0-9]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Expiry year of token to charge.

Found in `encryptedPayload.encryptedData.applicationExpiryDate` (MDES) or `encryptedPayload.token.tokenExpirationYear` (SCOF).
{{% /description_details %}}

{{% description_term %}}token[m4m][eci] {{% regex %}}0[267]{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Electronic Commerce Indicator.

Found in `eci` (SCOF). (Not available in MDES.)
{{% regex_optional %}}Required for CITs; otherwise optional (defaults to `07`).{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}token[m4m][tav] {{% regex %}}[:base64:]{28}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Token Authentication Value (TAV). Also known as token cryptogram and Digital Secure Remote Payments (DSRP) cryptogram.

Only DSRP cryptograms are supported. The value must start with `[A-P]` to be a DSRP cryptogram.

Found in `encryptedPayload.encryptedData.de48se43Data` (MDES) or `encryptedPayload.dynamicData.dynamicDataValue` (SCOF).
{{% regex_optional %}}Required for CITs; otherwise optional.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}token[m4m][rcai] {{% regex %}}[:base64:]{1..150}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Remote Commerce Acceptor Identifier.

Merchant identifier such as business website URL or reverse domain name (e.g. com.example.www). The identifier must be encoded as Base64.

Found in `customOutputData.remoteCommerceAcceptorIdentifier` (SCOF). (Not available in MDES.)
{{% regex_optional %}}Optional.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}token[m4m][3dsecure][v2] {{% regex %}}dictionary{{% /regex %}}{{% /description_term %}}
{{% description_details %}}See [Authentication: [3dsecure][v2]](#authentication-3dsecure-v2).
{{% regex_optional %}}Optional{{% /regex_optional %}}
{{% /description_details %}}
{{% /description_list %}}

#### Method: token[vts]

The required values are found in the VTS provision token response.

{{% description_list %}}
{{% description_term %}}token[vts][tan] {{% regex %}}[0-9]{12,19}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Token Account Number (TAN) of the token to charge.

Found in `tokenInfo.encTokenInfo`.
{{% /description_details %}}

{{% description_term %}}token[vts][expire_month] {{% regex %}}[0-9]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Expiry month of token to charge.

Found in `tokenInfo.expirationDate.month`.
{{% /description_details %}}

{{% description_term %}}token[vts][expire_year] {{% regex %}}20[0-9]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Expiry year of token to charge.

Found in `tokenInfo.expirationDate.year`.
{{% /description_details %}}

{{% description_term %}}token[vts][eci] {{% regex %}}0[57]{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Electronic Commerce Indicator.

Found in `cryptogramInfo.eci`.
{{% regex_optional %}}Required for CITs; otherwise optional (defaults to `07`).{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}token[vts][tav] {{% regex %}}[:base64:]{28}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Token Authentication Value (TAV). Also known as token cryptogram and Token Authentication Verification Value (TAVV).

Found in `cryptogramInfo.cryptogram`.
{{% regex_optional %}}Required for CITs; otherwise optional.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}token[vts][3dsecure][v2] {{% regex %}}dictionary{{% /regex %}}{{% /description_term %}}
{{% description_details %}}See [Authentication: [3dsecure][v2]](#authentication-3dsecure-v2).
{{% regex_optional %}}Optional{{% /regex_optional %}}
{{% /description_details %}}
{{% /description_list %}}
