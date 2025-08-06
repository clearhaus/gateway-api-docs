---
title: "sender_information"
date: 2023-01-05T13:37:00+01:00
anchor: "sender_information"
weight: 177
---
##### Sender information
See the partner guideline for more details.

Intra-EEA, mentioned below, includes the United Kingdom and Gibraltar.

{{% description_list %}}

{{% description_term %}}{{% strike %}}sender[name]{{% /strike %}} {{% regex %}}[\x20-\x7E]{2,30} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters){{% /regex %}}{{% /description_term %}}
{{% description_details %}}
{{% regex_optional %}}Deprecated, see `sender[first_name]`, `sender[middle_name]` and `sender[last_name]` instead.{{% /regex_optional %}}
{{% regex_optional %}}Mutually exclusive with `sender[first_name]`, `sender[middle_name]` and `sender[last_name]`.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}sender[first_name] {{% regex %}}[\x20-\x7E]{1,35} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters){{% /regex %}}{{% /description_term %}}
{{% description_details %}}The sender's legal first name.

{{% regex_optional %}}It must not contain special characters (?, @, #, $, &, \*, etc.), be all numeric, be fictious, be a nickname or be incomplete.{{% /regex_optional %}}
{{% regex_optional %}}Required for intra-EEA and international debits. Also required if any of the address-related parameters are supplied.{{% /regex_optional %}}
{{% regex_optional %}}Mutually exclusive with `sender[name]`.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}sender[middle_name] {{% regex %}}[\x20-\x7E]{1,35} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters){{% /regex %}}{{% /description_term %}}
{{% description_details %}}The sender's legal middle name in case of any.

{{% regex_optional %}}It must not contain special characters (?, @, #, $, &, \*, etc.), be all numeric, be fictious, be a nickname or be incomplete.{{% /regex_optional %}}
{{% regex_optional %}}If set, it requires `sender[first_name]` and `sender[last_name]` to be set.{{% /regex_optional %}}
{{% regex_optional %}}Mutually exclusive with `sender[name]`.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}sender[last_name] {{% regex %}}[\x20-\x7E]{1,35} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters){{% /regex %}}{{% /description_term %}}
{{% description_details %}}The sender's legal last name.

{{% regex_optional %}}It must not contain special characters (?, @, #, $, &, \*, etc.), be all numeric, be fictious, be a nickname or be incomplete.{{% /regex_optional %}}
{{% regex_optional %}}Required for intra-EEA and international debits. Also required if any of the address-related parameters are supplied.{{% /regex_optional %}}
{{% regex_optional %}}Mutually exclusive with `sender[name]`.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}sender[address] {{% regex %}}[\x20-\x7E]{1,35} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters){{% /regex %}}{{% /description_term %}}
{{% description_details %}}The sender's address (street name, house number, etc.).
{{% regex_optional %}}Required for intra-EEA and international debits.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}sender[city] {{% regex %}}[\x20-\x7E]{1,25} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters){{% /regex %}}{{% /description_term %}}
{{% description_details %}}The sender's city.
{{% regex_optional %}}Required for intra-EEA and international debits.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}sender[state] {{% regex %}}[A-Z]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}The sender's state.
{{% regex_optional %}}Required if the country is CA (Canada) or US (USA).{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}sender[country] {{% regex %}}[A-Z]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}The sender's country (ISO 3166-1 2-letter country code).
{{% regex_optional %}}Required for intra-EEA and international debits.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}sender[date_of_birth] {{% regex %}}[0-9]{4}-[0-9]{2}-[0-9]{2} (YYYY-MM-DD){{% /regex %}}{{% /description_term %}}
{{% description_details %}}The sender's date of birth (ISO 8601).
{{% regex_optional %}}Relevant for intra-EEA and international Visa debits.{{% /regex_optional %}}
{{% /description_details %}}

{{% /description_list %}}
