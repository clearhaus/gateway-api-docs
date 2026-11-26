---
title: "debits"
date: 2023-01-05T13:37:00+01:00
anchor: "debits"
weight: 276
---
## Debits
To transfer money from a cardholder's bank account in real-time, in one step, you make a new debit resource.
```shell
POST https://gateway.clearhaus.com/debits
```
Debits support the same parameters and payment methods as [Authorizations](#authorizations), with the exception that amount must be greater than zero.

Information about sender and recipient is required for debits under certain circumstances to be compliant with card scheme rules. See [Sender information](#sender_information) and [Recipient information](#recipient_information).

{{% notice %}}
**Notice:** Only merchants with selected Merchant Category Codes (MCCs) and assigned Business Application Identifiers (BAIs) (Visa) or Transaction Type Indicators (TTIs) (Mastercard) are able to process a debit; namely exactly those that will result in the debit being a Visa Account Funding Transaction (AFT) or Mastercard Funding Transaction (FT).
{{% /notice %}}

{{% notice %}}
**Notice**: For person-to-person money transfers (Visa BAI PP and AA), `text_on_statement` is not allowed. As required by the card scheme rules, the transaction gateway sets the text on the sender's bank statement to `<abbreviation>*<recipient name>` (e.g. `ABCD*Doe Jane A.`), where `<abbreviation>` is a 1–4 character abbreviation of the money transfer service and `<recipient name>` is `recipient[name]` truncated to 20 characters.
{{% /notice %}}

##### Person-to-person money transfers
To transfer the money to a recipient's card (person-to-person money transfer), add the recipient's card to the debit. If the debit is approved, the transaction gateway makes a credit for the same amount on the recipient's card, linked to the debit as required by the card scheme rules. If the credit is declined, the transaction gateway refunds the debit.

Any currency conversion must be done before the debit; the debit and the credit are in the recipient's currency.

The transaction gateway sets the text on the recipient's statement to `<abbreviation>*<sender name>` (e.g. `ABCD*Doe Jane A.`), where `<abbreviation>` is a 1–4 character abbreviation of the money transfer service and `<sender name>` is the debit's `sender[name]` truncated to 20 characters, as required by the card scheme rules.

{{% description_list %}}
{{% description_term %}}credit[card][pan] {{% regex %}}[0-9]{12,19}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Primary account number of the recipient's card.
{{% regex_optional %}}Optional. If present, [Sender information](#sender_information) and `recipient[name]` are required.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}credit[card][expire_month] {{% regex %}}[0-9]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Expiry month of the recipient's card.
{{% regex_optional %}}Optional.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}credit[card][expire_year] {{% regex %}}20[0-9]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Expiry year of the recipient's card.
{{% regex_optional %}}Optional.{{% /regex_optional %}}
{{% /description_details %}}

{{% /description_list %}}

The response then contains the credit and, if made, the debit refund:

```json
{
    "id": "4b6c5f0e-8d0a-4a51-9f1e-2a3c1b7d9e10",
    "status": { "code": 20000 },
    "amount": 50000,
    "currency": "EUR",
    "credit": { "id": "...", "status": { "code": 20000 } },
    "refund": null
}
```

{{% notice %}}
**Notice**: If the credit times out, its outcome is unknown and the debit is not refunded automatically. TBD how the outcome is resolved.
{{% /notice %}}
