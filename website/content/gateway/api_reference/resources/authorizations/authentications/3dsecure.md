---
title: "3dsecure"
date: 2022-04-13T12:37:22+02:00
anchor: "authentication-3dsecure"
weight: 140
---
#### Authentication: [3dsecure]

Only one 3-D Secure version can be used for a given authorization.

{{% description_term %}}[3dsecure][v2] {{% regex %}}dictionary{{% /regex %}}
{{% /description_term %}}
{{% description_details %}}
3-D Secure version 2, also known as EMV 3-D Secure.
{{% regex_optional %}}Optional. ~~Cannot be present if `v1` is present.~~{{% /regex_optional %}}
{{% /description_details %}}

{{% description_list %}}
{{% description_term %}}~~[3dsecure][v1]~~ {{% regex %}}~~dictionary~~{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Deprecated! Will stop working anytime after 2022-10-18. Please use `[3dsecure][v2]`.

~~3-D Secure version 1.~~
{{% regex_optional %}}~~Optional. Cannot be present if `v2` is present.~~{{% /regex_optional %}}{{% /description_details %}}

{{% /description_list %}}
