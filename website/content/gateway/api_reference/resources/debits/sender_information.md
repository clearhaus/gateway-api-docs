---
title: "sender_information"
date: 2023-01-05T13:37:00+01:00
anchor: "sender_information"
weight: 177
---
##### Sender information
To be compliant with card scheme rules, these parameters are required for debits under certain circumstances. Card scheme or issuer might even decline up front if one or more parameters are absent. See the partner guideline for more details.

{{% description_list %}}

{{% description_term %}}sender[name] {{% regex %}}[\x20-\x7E]{2,30} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters){{% /regex %}}{{% /description_term %}}
{{% description_details %}}The sender's legal name.

Example: "Doe Jane A." (last name, first name, optional middle initial).

{{% regex_optional %}}It must not contain special characters (?, @, #, $, &, \*, etc.), be all numeric, be fictious, be a nickname or be incomplete (only first or last name).{{% /regex_optional %}}
{{% regex_optional %}}Optional, however, it is required if any of the address-related parameters are supplied.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}sender[address] {{% regex %}}[\x20-\x7E]{1,35} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters){{% /regex %}}{{% /description_term %}}
{{% description_details %}}The sender's address (street name, house number, etc.).
{{% regex_optional %}}Optional{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}sender[city] {{% regex %}}[\x20-\x7E]{1,25} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters){{% /regex %}}{{% /description_term %}}
{{% description_details %}}The sender's city.
{{% regex_optional %}}Optional{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}sender[postal_code] {{% regex %}}[\x20-\x7E]{5,10} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters){{% /regex %}}{{% /description_term %}}
{{% description_details %}}The sender's postal code.
{{% regex_optional %}}Optional{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}sender[state] {{% regex %}}[A-Z]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}The sender's state.
{{% regex_optional %}}Required if the country is CA (Canada) or US (USA).{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}sender[country] {{% regex %}}[A-Z]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}The sender's country (ISO 3166-1 2-letter country code).
{{% regex_optional %}}Optional{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}sender[account_number] {{% regex %}}[\x20-\x7E]{1,34} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters){{% /regex %}}{{% /description_term %}}
{{% description_details %}}The sender's account number. It can be an IBAN, a proprietary wallet number, a prepaid PAN, etc.
{{% regex_optional %}}Optional{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}sender[reference] {{% regex %}}[\x20-\x7E]{1,16} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters){{% /regex %}}{{% /description_term %}}
{{% description_details %}}Sender reference number. You must be able to uniquely identify the sender using this number.
{{% regex_optional %}}Required if no account number is supplied.{{% /regex_optional %}}
{{% /description_details %}}

{{% /description_list %}}