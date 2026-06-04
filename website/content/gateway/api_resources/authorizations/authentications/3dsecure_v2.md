---
title: "3dsecure"
date: 2022-04-13T12:37:22+02:00
anchor: "authentication-3dsecure-v2"
weight: 255
---
### Authentication: [3dsecure][v2]

{{% description_list %}}
{{% description_term %}}[3dsecure][v2][ares] {{% regex %}}[\:json\:]{{% /regex %}}{{% /description_term %}}
{{% description_details %}}The 3-D Secure version 2 ARes containing authenticationValue, dsTransID, etc.
{{% regex_optional %}}Optional. Cannot be present if `rreq` or `raw` is present.{{% /regex_optional %}}{{% /description_details %}}

{{% description_term %}}[3dsecure][v2][rreq] {{% regex %}}[\:json\:]{{% /regex %}}{{% /description_term %}}
{{% description_details %}}The 3-D Secure version 2 RReq containing authenticationValue, dsTransID, etc.
{{% regex_optional %}}Optional. Cannot be present if `ares` or `raw` is present.{{% /regex_optional %}}{{% /description_details %}}

{{% description_term %}}[3dsecure][v2][raw][eci] {{% regex %}}[\:json\:]{{% /regex %}}{{% /description_term %}}
{{% description_details %}}The 3-D Secure version 2 ECI.
{{% regex_optional %}}Optional. Cannot be present if `rreq` or `ares` is present. Required if `raw[av]` is present.{{% /regex_optional %}}{{% /description_details %}}

{{% description_term %}}[3dsecure][v2][raw][av] {{% regex %}}[\:json\:]{{% /regex %}}{{% /description_term %}}
{{% description_details %}}The 3-D Secure version 2 authentication value.
{{% regex_optional %}}Optional. Cannot be present if `rreq` or `ares` is present. Required if `raw[eci]` is present.{{% /regex_optional %}}{{% /description_details %}}

{{% /description_list %}}
