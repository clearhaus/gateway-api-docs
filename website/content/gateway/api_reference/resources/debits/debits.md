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
Debits are created using a payment method ([card](#method-card), [applepay](#method-applepay), [googlepay](#method-googlepay), [mobilepayonline](#method-mobilepayonline), [moto](#method-moto), [token](#method-token), or [vipps](#method-vipps)) as listed under [Authorizations](#authorizations). Exactly one payment method must be used.

For authentication, [3-D Secure version 2](#authentication-3dsecurev2) is supported, and also [scheme reference to series](#scheme-reference-to-series) is supported---exactly as it is for [Authorizations](#authorizations). Notice that 3-D Secure version 1 is not supported.

Under certain circumstances, sender information is required for a debit. See [Sender information](#sender_information).

{{% notice %}}
**Notice:** Debits are only supported for Visa cards. Currently, only merchants with selected Merchant Category Codes (MCCs) and assigned Business Application Identifiers (BAIs) are able to process a debit; namely exactly those that will result in the debit being a Visa Account Funding Transaction (AFT).
{{% /notice %}}
