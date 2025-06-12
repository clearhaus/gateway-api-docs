---
title: "recipient_information"
date: 2023-07-20T13:01:49+01:00
anchor: "credit_recipient_information"
weight: 181
---
##### Recipient information
See the partner guideline for more details.

{{% description_list %}}

{{% description_term %}}recipient[first_name] {{% regex %}}[\x20-\x7E]{1,35} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters){{% /regex %}}{{% /description_term %}}
{{% description_details %}}The recipient's legal first name.

{{% regex_optional %}}It must not contain special characters (?, @, #, $, &, \*, etc.), be all numeric, be fictious, be a nickname or be incomplete.{{% /regex_optional %}}
{{% regex_optional %}}Required for Mastercard Payment of Winnings (PoW) and for Mastercard cross-border non-PoW.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}recipient[middle_name] {{% regex %}}[\x20-\x7E]{1,35} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters){{% /regex %}}{{% /description_term %}}
{{% description_details %}}The recipient's legal middle name in case of any.
{{% regex_optional %}}It must not contain special characters (?, @, #, $, &, \*, etc.), be all numeric, be fictious, be a nickname or be incomplete.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}recipient[last_name] {{% regex %}}[\x20-\x7E]{1,35} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters){{% /regex %}}{{% /description_term %}}
{{% description_details %}}The recipient's legal last name.

{{% regex_optional %}}It must not contain special characters (?, @, #, $, &, \*, etc.), be all numeric, be fictious, be a nickname or be incomplete.{{% /regex_optional %}}
{{% regex_optional %}}Required for Mastercard Payment of Winnings (PoW) and for Mastercard cross-border non-PoW.{{% /regex_optional %}}
{{% /description_details %}}

{{% /description_list %}}
