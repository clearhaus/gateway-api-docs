---
title: "moto"
date: 2022-04-13T12:37:22+02:00
anchor: "method-moto"
weight: 130
---
#### Method: moto

{{% description_list %}}
{{% description_term %}}moto[pan]  {{% regex %}}[0-9]{12,19}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}
Primary account number of card to charge.
{{% /description_details %}}

{{% description_term %}}moto[expire_month]  {{% regex %}}[0-9]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}
Expiry month of card to charge.
{{% /description_details %}}

{{% description_term %}}moto[expire_year]  {{% regex %}}[0-9]{4}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}
Expiry year of card to charge.
{{% /description_details %}}

{{% /description_list %}}
{{% notice %}}
**Notice**: Signing is required to use the `moto` payment method.

**Notice**: Neither `series[]` (nor `recurring`) nor `credential_on_file` is supported. Also, `initiator` cannot be `merchant`. 
{{% /notice %}}
