---
title: "debits"
date: 2023-01-05T13:37:00+01:00
anchor: "debits"
weight: 176
---
#### Debits
To transfer money from a cardholder's bank account in real-time, in one step, you make a new debit resource.
```shell
POST https://gateway.clearhaus.com/debits
```
Debits support the same parameters and payment methods as [Authorizations](#authorizations), with the exception that amount must be greater than zero.

Information about sender and recipient is required for debits under certain circumstances to be compliant with card scheme rules. See [Sender information](#sender_information) and [Recipient information](#recipient_information).

{{% notice %}}
**Notice:** Debits are supported for Visa and Mastercard. Only merchants with selected Merchant Category Codes (MCCs) and assigned Business Application Identifiers (BAIs) (VISA) or Transaction Type Indicator (TTI) (Mastercard) are able to process a debit; namely exactly those that will result in the debit being a Visa or Mastercard Account Funding Transaction (AFT).
{{% /notice %}}
