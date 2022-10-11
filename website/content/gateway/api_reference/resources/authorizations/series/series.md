---
title: "Scheme reference to series"
date: 2022-04-13T12:37:22+02:00
anchor: "scheme-reference-to-series"
weight: 155
---
#### Scheme reference to series

If the previous-in-series authorization was made via this API, you should use `series[previous][id]` to reference it. If it was not made via this API, you must obtain explicit approval from Clearhaus to use the raw scheme values grouped in `series[previous][mastercard]` and `series[previous][visa]`. This is relevant when moving a subscription from another acquirer to Clearhaus or among Clearhaus accounts.

The Mastercard specific reference to the series contains the following parts.

{{% description_list %}}
{{% description_term %}}series[previous][mastercard][type] {{% regex %}}(recurring|unscheduled){{% /regex %}}{{% /description_term %}}
{{% description_details %}}The type of the existing series.

Default: `recurring`. 
{{% regex_optional %}}Conditional. Cannot be present if `series[previous][id]` or any `series[previous][visa][...]` is present. {{% /regex_optional %}}{{% /description_details %}}


{{% description_term %}}series[previous][mastercard][tid] {{% regex %}}[A-Za-z0-9]{3}[A-Za-z0-9]{6}[0-9]{4} {2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Trace ID being the concatenation of values Data element 63 subfield 1 (Financial Network Code) (position 1-3), Data element 63 subfield 2 (Banknet Reference Number) (position 4-9), Data element 15 (Date, Settlement, in MMDD format) (position 10-13), and two spaces; to be used in Data Element 48, Subfield 63. 
{{% regex_optional %}}Conditional. Required if any `series[previous][mastercard][...]` is present. Cannot be present if `series[previous][id]` or any `series[previous][visa][...]` is present. {{% /regex_optional %}}{{% /description_details %}}



{{% description_term %}}series[previous][mastercard][exemption]  {{% regex %}}(fixed_amount_series|variable_amount_series){{% /regex %}}{{% /description_term %}}
{{% description_details %}}The Mastercard exemption is used to indicate if the series is fixed-amount or a variable-amount.

- `fixed_amount_series`: The series is a fixed-amount series. (MPMI value `03`.)
- `variable_amount_series`: The series is a variable-amount series. (MPMI value `01`.) A Mastercard exemption (not formally an acquirer exemption for SCA) indicating that the transaction is out of scope for SCA.

If the previous-in-series is a subsequent-in-series it should be equal to the Mastercard exemption applied for the previous-in-series. The value originates from Mastercard Data element 48, Subelement 22, Subfield 1. The value `01` indicates variable amount whereas `03` indicates fixed amount.
Clearhaus uses the same Mastercard exemption for an entire series when a previous-in-series authorization in the series is referenced via series[previous][id]. 
{{% regex_optional %}}Conditional. Required if any `series[previous][mastercard][...]` is present. Cannot be present if `series[previous][id]` or any `series[previous][visa][...]` is present. {{% /regex_optional %}}{{% /description_details %}}

{{% /description_list %}}

The Visa specific reference to the series contains the following parts.
{{% description_list %}}
{{% description_term %}}series[previous][visa][type] {{% regex %}}(recurring|unscheduled){{% /regex %}}{{% /description_term %}}
{{% description_details %}}The type of the existing series.

Default: `recurring`. 
{{% regex_optional %}}Conditional. Cannot be present if `series[previous][id]` or any `series[previous][mastercard][...]` is present. {{% /regex_optional %}}{{% /description_details %}}


{{% description_term %}}series[previous][visa][tid] {{% regex %}}[0-9]{15}{{% /description_term %}}
{{% description_details %}}Transaction ID from Field 62.2 of the first-in-series or previous-in-series authorization; to be used in Field 125, Usage 2, Dataset ID 03. 
{{% regex_optional %}}Conditional. Required if `series[previous][visa][type]` is present. Cannot be present if `series[previous][id]` or any `series[previous][mastercard][...]` is present.{{% /regex_optional %}}{{% /description_details %}}
{{% notice %}}
**Notice**: A series migrated to Clearhaus using these scheme references cannot be continued with the now deprecated recurring flag. Instead, the subsequent-in-series following an authorization created using scheme references must use `series[previous][id]` to point to the previous in series. 

{{% /notice %}}
{{% /description_list %}}
