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
