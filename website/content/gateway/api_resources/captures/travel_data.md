---
title: "Travel data"
date: 2022-04-13T12:37:22+02:00
anchor: "travel-data"
weight: 265
---
### Travel data
At most one type of travel data can be supplied for a capture; if `travel` is supplied, it must include exactly one of `travel[car]`, `travel[flight]`, or `travel[lodging]`.

For service type `[car]` (rental), the following parameter is relevant.
{{% description_list %}}
{{% description_term %}}travel[car][pick_up_date] {{% regex %}}20[0-9]{2}-[0-9]{2}-[0-9]{2} (YYYY-MM-DD){{% /regex %}}{{% /description_term %}}
{{% description_details %}}The agreed pick-up date; can be in the future or in the past.
{{% /description_details %}}
{{% /description_list %}}


For service type `[flight]`, the following parameter is relevant.
{{% description_list %}}
{{% description_term %}}travel[flight][departure_date] {{% regex %}}20[0-9]{2}-[0-9]{2}-[0-9]{2} (YYYY-MM-DD){{% /regex %}}{{% /description_term %}}
{{% description_details %}}The departure date; can be in the future or in the past.
{{% /description_details %}}
{{% /description_list %}}

For service type `[lodging]` the following parameter is relevant.
{{% description_list %}}
{{% description_term %}}travel[lodging][check_in_date] {{% regex %}}20[0-9]{2}-[0-9]{2}-[0-9]{2} (YYYY-MM-DD){{% /regex %}}{{% /description_term %}}
{{% description_details %}}The agreed check-in date; can be in the future or in the past.
{{% /description_details %}}
{{% /description_list %}}
