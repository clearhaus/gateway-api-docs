---
title: "debit_credits"
date: 2026-11-25T12:00:00+01:00
anchor: "debit_credits"
weight: 279
---
## Debit credits
To complete a person-to-person (P2P) money transfer, you transfer the money of an approved debit to the recipient's card by making a new credit resource on the debit.

```shell
POST https://gateway.clearhaus.com/debits/:id/credits
```

The recipient's card, recipient name, sender information and source of funds are taken from the debit, so the debit must contain [Sender information](#sender_information) and [Recipient information](#recipient_information), with `recipient[account_number_type]` set to `pan`.

Any currency conversion must be done before the debit. The debit and the credit are in the recipient's currency.

##### Parameters
{{% description_list %}}
{{% description_term %}}amount{{% regex %}}[1-9][0-9]{,8}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Amount in minor units of the debit's currency.
{{% regex_optional %}}Optional, defaults to the debit's amount. Must not exceed the debit's amount.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}reference{{% regex %}}[\x20-\x7E]{1,30} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters) {{% /regex %}}{{% /description_term %}}
{{% description_details %}}A reference to an external object.
{{% regex_optional %}}Optional{{% /regex_optional %}}
{{% /description_details %}}
{{% /description_list %}}

{{% notice %}}
**Notice**: Only a single credit can be made for a debit, and only if the debit is approved and has not been refunded. If the credit is declined, refund the debit using [Debit refunds](#debit_refunds).
{{% /notice %}}
