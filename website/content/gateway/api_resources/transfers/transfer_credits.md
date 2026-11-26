---
title: "transfer_credits"
date: 2026-11-25T12:00:00+01:00
anchor: "transfer_credits"
weight: 284
---
## Transfer credits
To pay out the money of a transfer to the recipient's card you make a new credit on the transfer.

```shell
POST https://gateway.clearhaus.com/transfers/:id/credits
```

The credit is made for the transfer's amount and currency. The recipient's card, recipient name, sender information and source of funds are taken from the transfer and its debit.

##### Parameters
No parameters are needed to make a new transfer credit.

{{% notice %}}
**Notice**: A credit can only be made once the transfer's debit is approved and has not been refunded. Only a single approved credit can be made for a transfer. If the credit is declined, refund the debit using [Debit refunds](#debit_refunds).
{{% /notice %}}
