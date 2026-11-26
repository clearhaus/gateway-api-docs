---
title: "transfer_debits"
date: 2026-11-25T12:00:00+01:00
anchor: "transfer_debits"
weight: 282
---
## Transfer debits
To take the money of a transfer from the sender's card you make a new debit on the transfer.

```shell
POST https://gateway.clearhaus.com/transfers/:id/debits
```

The debit is made for the transfer's amount and currency, with the transfer's sender and recipient information.

The sender's bank statement shows `<abbreviation>*<recipient name>`, e.g. `ABCD*Doe Jane A.`

##### Parameters
Transfer debits support the same payment methods and authentication as [Debits](#debits).

{{% description_list %}}
{{% description_term %}}card[...]{{% /description_term %}}
{{% description_details %}}The sender's card. See [Method: card](#method-card).
{{% /description_details %}}

{{% description_term %}}card[3dsecure][v2][...]{{% /description_term %}}
{{% description_details %}}3-D Secure version 2 authentication of the sender. See [Authentication: [3dsecure][v2]](#authentication-3dsecure-v2).
{{% /description_details %}}
{{% /description_list %}}

{{% notice %}}
**Notice**: Only a single approved debit can be made for a transfer. Refund the debit using [Debit refunds](#debit_refunds).
{{% /notice %}}
