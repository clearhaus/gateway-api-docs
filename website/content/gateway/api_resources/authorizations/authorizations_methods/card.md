---
title: "card"
date: 2022-04-13T12:37:22+02:00
anchor: "method-card"
weight: 215
---
### Method: card
{{% description_list %}}
{{% description_term %}}card[pan] {{% regex %}}[0-9]{12,19}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Primary account number of card to charge.
{{% /description_details %}}

{{% description_term %}}card[expire_month] {{% regex %}}[0-9]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Expiry month of card to charge.
{{% /description_details %}}

{{% description_term %}}card[expire_year] {{% regex %}}20[0-9]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Expiry year of card to charge.
{{% /description_details %}}

{{% description_term %}}card[csc] {{% regex %}}[0-9]{3}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Card Security Code.

{{% regex_optional %}}Optional when partner is trusted.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}card[3dsecure] {{% regex %}}dictionary{{% /regex %}}{{% /description_term %}}
{{% description_details %}}See [Authentication: [3dsecure]](#authentication-3dsecure).
{{% regex_optional %}}Optional.{{% /regex_optional %}}
{{% /description_details %}}
{{% /description_list %}}
{{% notice %}}
**Notice:** An authorization that includes `card[3dsecure][v2][rreq]` and/or `card[csc]` cannot be a subsequent-in-series authorization.
{{% /notice %}}
