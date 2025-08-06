---
title: "recipient_information"
date: 2023-07-20T13:01:49+01:00
anchor: "debit_recipient_information"
weight: 178
---
##### Recipient information
See the partner guideline for more details.

{{% description_list %}}

{{% description_term %}}{{% strike %}}recipient[name]{{% /strike %}} {{% regex %}}[\x20-\x7E]{2,30} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters){{% /regex %}}{{% /description_term %}}
{{% description_details %}}
{{% regex_optional %}}Deprecated, see `recipient[first_name]`, `recipient[middle_name]` and `recipient[last_name]` instead.{{% /regex_optional %}}
{{% regex_optional %}}Mutually exclusive with `recipient[first_name]`, `recipient[middle_name]` and `recipient[last_name]`.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}recipient[first_name] {{% regex %}}[\x20-\x7E]{1,35} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters){{% /regex %}}{{% /description_term %}}
{{% description_details %}}The recipient's legal first name.

{{% regex_optional %}}It must not contain special characters (?, @, #, $, &, \*, etc.), be all numeric, be fictious, be a nickname or be incomplete.{{% /regex_optional %}}
{{% regex_optional %}}Required.{{% /regex_optional %}}
{{% regex_optional %}}Mutually exclusive with `recipient[name]`.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}recipient[middle_name] {{% regex %}}[\x20-\x7E]{1,35} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters){{% /regex %}}{{% /description_term %}}
{{% description_details %}}The recipient's legal middle name in case of any.
{{% regex_optional %}}It must not contain special characters (?, @, #, $, &, \*, etc.), be all numeric, be fictious, be a nickname or be incomplete.{{% /regex_optional %}}
{{% regex_optional %}}If set, it requires `recipient[first_name]` and `recipient[last_name]` to be set.{{% /regex_optional %}}
{{% regex_optional %}}Mutually exclusive with `recipient[name]`.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}recipient[last_name] {{% regex %}}[\x20-\x7E]{1,35} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters){{% /regex %}}{{% /description_term %}}
{{% description_details %}}The recipient's legal last name.

{{% regex_optional %}}It must not contain special characters (?, @, #, $, &, \*, etc.), be all numeric, be fictious, be a nickname or be incomplete.{{% /regex_optional %}}
{{% regex_optional %}}Required.{{% /regex_optional %}}
{{% regex_optional %}}Mutually exclusive with `recipient[name]`.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}recipient[account_number] {{% regex %}}[\x20-\x7E]{1,34} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters){{% /regex %}}{{% /description_term %}}
{{% description_details %}}The recipient's account number, i.e. an identification of the account being funded by the debit.
{{% regex_optional %}}Required.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}recipient[account_number_type] {{% regex %}}(other|rtn_and_ban|iban|email|phone_number|ban_and_bic|wallet_id|social_network_id){{% /regex %}}{{% /description_term %}}
{{% description_details %}}The recipient's account number type.
{{% regex_optional %}}Required	for Mastercard; otherwise optional{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}recipient[reference] {{% regex %}}[\x20-\x7E]{1,16} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters){{% /regex %}}{{% /description_term %}}
{{% description_details %}}Recipient reference number. You must be able to uniquely identify the recipient using this number.
{{% regex_optional %}}Required for Visa if the merchant account's Business Application Identifier (BAI) is Funds Disbursement (FD).{{% /regex_optional %}}
{{% /description_details %}}

{{% /description_list %}}
