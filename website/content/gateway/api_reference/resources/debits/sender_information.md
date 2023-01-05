---
title: "sender_information"
date: 2023-01-05T13:37:00+01:00
anchor: "sender_information"
weight: 177
---
##### Sender information
These parameters are required for debits under certain circumstances. See the partner guideline for more details.

{{% description_list %}}

{{% description_term %}}sender[name] {{% regex %}}[\x20-\x7E]{2,30} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters){{% /regex %}}{{% /description_term %}}
{{% description_details %}}The sender's legal name.

Example: "Doe Jane A." (last name, first name, optional middle initial).

{{% regex_optional %}}It must not contain special characters (?, @, #, $, &, \*, etc.), be all numeric, be fictious, be a nickname or be incomplete (only first or last name).{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}sender[address] {{% regex %}}[\x20-\x7E]{1,35} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters){{% /regex %}}{{% /description_term %}}
{{% description_details %}}The sender's address (street name, house number, etc.).
{{% /description_details %}}

{{% description_term %}}sender[city] {{% regex %}}[\x20-\x7E]{1,25} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters){{% /regex %}}{{% /description_term %}}
{{% description_details %}}The sender's city.
{{% /description_details %}}

{{% description_term %}}sender[postal_code] {{% regex %}}[\x20-\x7E]{5,10} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters){{% /regex %}}{{% /description_term %}}
{{% description_details %}}The sender's postal code.
{{% /description_details %}}

{{% description_term %}}sender[state] {{% regex %}}[A-Z]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}The sender's state when the country is 124 (Canada) or 840 (USA).
{{% /description_details %}}

{{% description_term %}}sender[country] {{% regex %}}[0-9]{3}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}The sender's country (ISO 3166-1 numeric).
{{% /description_details %}}

{{% description_term %}}sender[account_number] {{% regex %}}[\x20-\x7E]{1,34} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters){{% /regex %}}{{% /description_term %}}
{{% description_details %}}The sender's account number. It can be an IBAN, a proprietary wallet number, a prepaid PAN, etc.
{{% /description_details %}}

{{% description_term %}}sender[reference] {{% regex %}}[\x20-\x7E]{1,16} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters){{% /regex %}}{{% /description_term %}}
{{% description_details %}}Sender reference number. You must be able to uniquely identify the sender using this number.
{{% /description_details %}}

{{% /description_list %}}
