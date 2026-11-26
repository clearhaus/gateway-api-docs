---
title: "transfers"
date: 2026-11-26T12:00:00+01:00
anchor: "transfers"
weight: 281
---
## Transfers
A transfer represents a person-to-person money transfer from a sender's card to a recipient's card. It holds the information shared by the transfer's [debit](#transfer_debits) and [credit](#transfer_credits).

```shell
POST https://gateway.clearhaus.com/transfers
```

A transfer is made in three steps:

1. Make a transfer with the amount, sender and recipient.
2. Make a debit on the sender's card using `POST /transfers/:id/debits`.
3. Make a credit on the recipient's card using `POST /transfers/:id/credits`.

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

{{% description_term %}}sender[...]{{% /description_term %}}
{{% description_details %}}See [Sender information](#sender_information).
{{% regex_optional %}}Required.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}recipient[name]{{% /description_term %}}
{{% description_details %}}See [Recipient information](#recipient_information).
{{% regex_optional %}}Required.{{% /regex_optional %}}
{{% /description_details %}}
{{% /description_list %}}

##### Response
The response contains the transfer's state and its debit and credit, once made:

```json
{
    "id": "4b6c5f0e-8d0a-4a51-9f1e-2a3c1b7d9e10",
    "state": "created",
    "amount": 50000,
    "currency": "EUR",
    "debit": null,
    "credit": null
}
```

`state` is one of `created`, `debited`, `credited`, `refunded` or `failed`.
