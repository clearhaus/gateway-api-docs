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
**Notice**: For person-to-person money transfers, `text_on_statement` is not allowed. The sender's bank statement shows `<abbreviation>*<recipient name>`, e.g. `ABCD*Doe Jane A.`
{{% /notice %}}

##### Person-to-person money transfers
To complete a person-to-person money transfer in the same call, set `credit` to `true`. If the debit is approved, the transaction gateway then makes a credit for the same amount to the recipient's card (`recipient[account_number]`). If the credit is declined, the transaction gateway refunds the debit.

Any currency conversion must be done before the debit. The debit and the credit are in the recipient's currency.

{{% description_list %}}
{{% description_term %}}credit{{% regex %}}(true|false){{% /regex %}}{{% /description_term %}}
{{% description_details %}}Indicates whether to credit the recipient's card if the debit is approved.

{{% regex_optional %}}Optional, defaults to `false`. If `true`, `recipient[account_number_type]` must be `pan`.{{% /regex_optional %}}
{{% /description_details %}}
{{% /description_list %}}

{{% notice %}}
**Notice**: If the credit times out, its outcome is unknown and the debit is not refunded automatically. TBD how the outcome is resolved.
{{% /notice %}}
