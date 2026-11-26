---
title: "Credits"
date: 2022-04-13T12:37:22+02:00
anchor: "credits"
weight: 280
---
## Credits
To payout (e.g. winnings and not refunds) money to a cardholder’s bank account you make a new credit resource.
```shell
POST https://gateway.clearhaus.com/credits
```
##### Parameters
{{% description_list %}}
{{% description_term %}}amount{{% regex %}}[1-9][0-9]{,8}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Amount in minor units of given currency (e.g. cents if in Euro).
{{% /description_details %}}

{{% description_term %}}currency{{% regex %}}[A-Z]{3}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}[3-letter currency code](/currencies). (Some exponents differ from ISO 4217.) 
{{% /description_details %}}

{{% description_term %}}text_on_statement{{% regex %}}[\x20-\x7E]{2,22} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters) {{% /regex %}}{{% /description_term %}}
{{% description_details %}}Text that will be placed on cardholder’s bank statement.

{{% regex_optional %}}May not be all digits, all same character, or all sequential characters (e.g. “abc”).{{% /regex_optional %}}
{{% regex_optional %}}Optional, defaults to account's descriptor. Not allowed for person-to-person money transfers.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}reference{{% regex %}}[\x20-\x7E]{1,30} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters) {{% /regex %}}{{% /description_term %}}
{{% description_details %}} A reference to an external object, such as an order number.

{{% regex_optional %}}Optional{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}card[pan] {{% regex %}}[0-9]{12,19}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Primary account number of card to charge.
{{% /description_details %}}

{{% description_term %}}card[expire_month] {{% regex %}}[0-9]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Expiry month of card to charge.
{{% /description_details %}}

{{% description_term %}}card[expire_year] {{% regex %}}20[0-9]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Expiry year of card to charge.
{{% /description_details %}}

{{% description_term %}}card[csc] {{% regex %}} [0-9]{3}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Card Security Code.
{{% regex_optional %}}Optional.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}card[name] {{% regex %}}[A-Za-z0-9 ]{1,30}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}Name on card.
{{% regex_optional %}}Required for Mastercard Payment of Winnings (PoW) and for Mastercard cross-border non-PoW.{{% /regex_optional %}}
{{% /description_details %}}

{{% /description_list %}}

{{% notice %}}
**Notice**: Implicitly, `initiator` is `merchant` and `credential_on_file` is `use`.
{{% /notice %}}

##### Person-to-person money transfers
Credits completing a person-to-person money transfer (Visa BAI PP and AA) must contain the following parameters. Any currency conversion must be done before the debit; the debit and the credit are in the recipient's currency.

The transaction gateway sets the text on the recipient's statement to `<abbreviation>*<sender name>` (e.g. `ABCD*Doe Jane A.`), where `<abbreviation>` is a 1–4 character abbreviation of the money transfer service and `<sender name>` is `sender[name]` truncated to 20 characters, as required by the card scheme rules.

{{% description_list %}}
{{% description_term %}}funding_transaction_id{{% regex %}}[0-9]{15}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}The card scheme transaction ID of the debit funding the credit, as returned in the debit response. Links the credit to the debit as required by the card scheme rules.
{{% regex_optional %}}Required.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}sender[name] {{% regex %}}[\x20-\x7E]{2,30} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters){{% /regex %}}{{% /description_term %}}
{{% description_details %}}The sender's legal name. Same format as for [Sender information](#sender_information).
{{% regex_optional %}}Required.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}sender[address] {{% regex %}}[\x20-\x7E]{1,35} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters){{% /regex %}}{{% /description_term %}}
{{% description_details %}}The sender's primary residential address (street name, house number, etc.). Must not be a P.O. box.
{{% regex_optional %}}Required for intra-EEA and international credits.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}sender[city] {{% regex %}}[\x20-\x7E]{1,25} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters){{% /regex %}}{{% /description_term %}}
{{% description_details %}}The sender's city.
{{% regex_optional %}}Required.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}sender[state] {{% regex %}}[A-Z]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}The sender's state.
{{% regex_optional %}}Required if the country is CA (Canada) or US (USA).{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}sender[country] {{% regex %}}[A-Z]{2}{{% /regex %}}{{% /description_term %}}
{{% description_details %}}The sender's country of residence (ISO 3166-1 2-letter country code).
{{% regex_optional %}}Required.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}sender[account_number] {{% regex %}}[\x20-\x7E]{1,34} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters){{% /regex %}}{{% /description_term %}}
{{% description_details %}}The account used to fund the transfer, i.e. the primary account number of the sender's card.
{{% regex_optional %}}Required.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}sender[source_of_funds] {{% regex %}}(visa_credit|visa_debit|visa_prepaid|cash|deposit_account|credit_account){{% /regex %}}{{% /description_term %}}
{{% description_details %}}How the transfer was funded.
{{% regex_optional %}}Required.{{% /regex_optional %}}
{{% /description_details %}}

{{% description_term %}}recipient[name] {{% regex %}}[\x20-\x7E]{2,30} [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters){{% /regex %}}{{% /description_term %}}
{{% description_details %}}The recipient's legal name. Same format as for [Recipient information](#recipient_information).
{{% regex_optional %}}Required for intra-EEA and international credits.{{% /regex_optional %}}
{{% /description_details %}}
{{% /description_list %}}
