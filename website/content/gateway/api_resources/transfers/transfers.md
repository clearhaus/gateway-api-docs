---
title: "transfers"
date: 2026-11-25T12:00:00+01:00
anchor: "transfers"
weight: 281
---
## Transfers
To transfer money from a sender's card to a recipient's card (person-to-person money transfer) you make a new transfer resource.

```shell
POST https://gateway.clearhaus.com/transfers
```

The transaction gateway makes a [debit](#debits) on the sender's card and, if it is approved, a [credit](#credits) on the recipient's card. The credit is linked to the debit as required by the card scheme rules. If the credit is declined, the transaction gateway refunds the debit.

The transaction gateway sets the text on the cardholders' statements as required by the card scheme rules: `<abbreviation>*<recipient name>` on the sender's statement and `<abbreviation>*<sender name>` on the recipient's statement (e.g. `ABCD*Doe Jane A.`), where `<abbreviation>` is the merchant account's 1–4 character statement abbreviation and the names are truncated to 20 characters.

Any currency conversion must be done before the transfer; the debit and the credit are in the recipient's currency.

##### Parameters
{{% description_list %}}
{{% description_term %}}amount{{% regex %}}[1-9][0-9]{,8}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Amount in minor units of the recipient's currency.
{{% /description_details %}}

{{% description_term %}}currency{{% regex %}}[A-Z]{3}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}[3-letter currency code](/currencies) of the recipient's card.
{{% /description_details %}}

{{% description_term %}}reference{{% regex %}}[\x20-\x7E]{1,30} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters) {{% /regex %}}{{% /description_term %}}
{{% description_details %}}A reference to an external object.
{{% regex_optional %}}Optional{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}debit[...]{{% /description_term %}}
{{% description_details %}}The sender's payment method and authentication, as for [Debits](#debits) (e.g. `debit[card][pan]`, `debit[card][3dsecure][v2][...]`).
{{% /description_details %}}

{{% description_term %}}sender[...]{{% /description_term %}}
{{% description_details %}}See [Sender information](#sender_information).
{{% regex_optional %}}Required.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}recipient[name]{{% /description_term %}}
{{% description_details %}}See [Recipient information](#recipient_information).
{{% regex_optional %}}Required.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}recipient[card][pan] {{% regex %}}[0-9]{12,19}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Primary account number of the recipient's card.
{{% /description_details %}}

{{% description_term %}}recipient[card][expire_month] {{% regex %}}[0-9]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Expiry month of the recipient's card.
{{% regex_optional %}}Optional.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}recipient[card][expire_year] {{% regex %}}20[0-9]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Expiry year of the recipient's card.
{{% regex_optional %}}Optional.{{% /regex_optional %}}
{{% /description_details %}}
{{% /description_list %}}

##### Response
The response contains the transfer's status and the debit, credit and, if made, debit refund:

```json
{
    "id": "4b6c5f0e-8d0a-4a51-9f1e-2a3c1b7d9e10",
    "status": { "code": 20000 },
    "amount": 50000,
    "currency": "EUR",
    "debit": { "id": "...", "status": { "code": 20000 } },
    "credit": { "id": "...", "status": { "code": 20000 } },
    "debit_refund": null
}
```

{{% notice %}}
**Notice**: If the credit times out, the transfer's status is unknown and the debit is not refunded automatically. TBD how the outcome is resolved.
{{% /notice %}}
