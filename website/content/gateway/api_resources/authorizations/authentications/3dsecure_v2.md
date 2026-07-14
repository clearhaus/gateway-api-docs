---
title: "3dsecure"
date: 2022-04-13T12:37:22+02:00
anchor: "authentication-3dsecure-v2"
weight: 255
---
### Authentication: [3dsecure][v2]

Three 3-D Secure authentication methods are available: `ares`, `rreq` and `raw`. Only one may be present.

#### Authentication: ARes

{{% description_list %}}
{{% description_term %}}[3dsecure][v2][ares] {{% regex %}}[\:json\:]{{% /regex %}}{{% /description_term %}}
{{% description_details %}}The 3-D Secure version 2 ARes containing authenticationValue, dsTransID, etc.{{% /description_details %}}
{{% /description_list %}}

#### Authentication: RReq

{{% description_list %}}
{{% description_term %}}[3dsecure][v2][rreq] {{% regex %}}[\:json\:]{{% /regex %}}{{% /description_term %}}
{{% description_details %}}The 3-D Secure version 2 RReq containing authenticationValue, dsTransID, etc.{{% /description_details %}}
{{% /description_list %}}

#### Authentication: Raw

{{% description_list %}}
{{% description_term %}}[3dsecure][v2][raw][eci] {{% regex %}}[0-9]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}The 3-D Secure version 2 ECI.
{{% regex_optional %}}Required for Visa. Required for Mastercard when `trans_status` is `Y`, `A`, `I` or `U`.{{% /regex_optional %}}{{% /description_details %}}

{{% description_term %}}[3dsecure][v2][raw][av] {{% regex %}}[:base64:]{28}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}The 3-D Secure version 2 authentication value.
{{% regex_optional %}}Required for Visa. Required for Mastercard when `trans_status` is `Y`, `A`, `I` or `U`.{{% /regex_optional %}}{{% /description_details %}}

{{% description_term %}}[3dsecure][v2][raw][trans_status] {{% regex %}}[A-Z]{{% /regex %}}{{% /description_term %}}
{{% description_details %}}The 3-D Secure version 2 trans status.
{{% /description_details %}}

{{% description_term %}}[3dsecure][v2][raw][message_version] {{% regex %}}2[.][0-9][.][0-9]{{% /regex %}}{{% /description_term %}}
{{% description_details %}}The 3-D Secure version 2 message version.
{{% /description_details %}}

{{% description_term %}}[3dsecure][v2][raw][message_type] {{% regex %}}(ARes|RReq){{% /regex %}}{{% /description_term %}}
{{% description_details %}}The 3-D Secure version 2 message type.
{{% /description_details %}}

{{% description_term %}}[3dsecure][v2][raw][authentication_type] {{% regex %}}[0-9]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}The 3-D Secure version 2 authentication type.
{{% regex_optional %}}Optional.{{% /regex_optional %}}{{% /description_details %}}

{{% description_term %}}[3dsecure][v2][raw][ds_trans_id] {{% regex %}}[\:UUIDv4\:]{{% /regex %}}{{% /description_term %}}
{{% description_details %}}The 3-D Secure version 2 DS transaction ID.
{{% regex_optional %}}Required for Mastercard.{{% /regex_optional %}}{{% /description_details %}}

{{% /description_list %}}
