---
title: "Refunds"
date: 2022-04-13T12:37:22+02:00
anchor: "refunds"
weight: 170
---
#### Voids
To refund money to a cardholder’s bank account you make a new refund resource. You can make multiple refunds for an authorization transaction.
```shell
POST https://gateway.clearhaus.com/authorizations/:id/refunds
```
##### Parameters
{{% description_list %}}
{{% description_term %}}amount{{% regex %}}[1-9][0-9]{,8}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Amount in minor units of given currency (e.g. cents if in Euro). The full or remaining amount will be refunded if no amount is given.  
{{% regex_optional %}}Optional{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}text_on_statement{{% regex %}}[\x20-\x7E]{2,22} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters) {{% /regex %}}{{% /description_term %}}
{{% description_details %}}Text that will be placed on cardholder’s bank statement. Overrides `text_on_statement` from authorization. 

{{% regex_optional %}} May not be all digits, all same character, or all sequential characters (e.g. “abc”){{% /regex_optional %}}
{{% regex_optional %}}Optional{{% /regex_optional %}}
{{% /description_details %}}

{{% /description_list %}}

{{% notice %}}
**Notice**: A refund does not “free up” what is captured from the authorization; that is, after authorizing 10, capturing 5 and refunding 5, you can still only capture 5. 
{{% /notice %}}
{{% notice %}}
**Notice**: A refund cannot be made if the last capture is 180 days old. 
{{% /notice %}}
