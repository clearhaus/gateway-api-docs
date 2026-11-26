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

The credit is made for the transfer's amount and currency, and is linked to the transfer's debit as required by the card scheme rules. Sender information, recipient name and source of funds are taken from the transfer and its debit.

##### Parameters
{{% description_list %}}
{{% description_term %}}text_on_statement{{% regex %}}[\x20-\x7E]{2,22} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters) {{% /regex %}}{{% /description_term %}}
{{% description_details %}}Text that will be placed on the recipient's bank statement.
{{% regex_optional %}}Optional, defaults to account's descriptor.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}card[pan] {{% regex %}}[0-9]{12,19}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Primary account number of the recipient's card.
{{% /description_details %}}

{{% description_term %}}card[expire_month] {{% regex %}}[0-9]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Expiry month of the recipient's card.
{{% regex_optional %}}Optional.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}card[expire_year] {{% regex %}}20[0-9]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Expiry year of the recipient's card.
{{% regex_optional %}}Optional.{{% /regex_optional %}}
{{% /description_details %}}
{{% /description_list %}}

{{% notice %}}
**Notice**: A credit can only be made once the transfer's debit is approved and has not been refunded. Only a single approved credit can be made for a transfer. If the credit is declined, refund the debit using [Debit refunds](#debit_refunds).
{{% /notice %}}
