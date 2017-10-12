---
title: Clearhaus Transaction API Documentation
---

# Getting Started

You need an API key before you can interact with our API. Send an E-mail to <a href="mailto:support@clearhaus.com">support@clearhaus.com</a> to request an API key.

<p class="alert alert-danger">
API keys come with many privileges so keep them secret.
</p>

## API endpoint

````
https://gateway.clearhaus.com      # live accounts
https://gateway.test.clearhaus.com # test accounts
````


## Authentication

Authentication is done via HTTP Basic Auth. Simply provide your API key as
username and a blank string as password. Remember a colon `:` after username
when using cURL to specify an empty password.

````shell
curl https://gateway.test.clearhaus.com \
     -u <your-api-key>:
````

You will get this response when you provide an invalid API key:

````http
HTTP/1.1 401 Not Authorized
````

## Resource discovery

The API follows [HATEOAS][HATEOAS] principle of REST which means all resources
are discoverable.

```shell
curl https://gateway.test.clearhaus.com \
     -u <your-api-key>:
```

```json
{
    "_links": {
        "authorizations": { "href": "/authorizations" },
        "cards":          { "href": "/cards" },
        "account":        { "href": "/account" }
    }
}
```

## Response format
All responses will be delivered in JSON format (see [JSON-HAL][JSON-HAL]).

````
Content-Type: application/vnd.clearhaus-gateway.hal+json; version=0.9.0; charset=utf-8
````

We use HTTP response codes to indicate API response status:

````
Number  Text                 
200     OK                   
201     Created              
400     Bad Request          
401     Unauthorized         
404     Not Found            
5xx     Server Error
````

## Signing requests

Requests can optionally be signed.

The signature is an RSA signature of the HTTP body; it is represented in Hex.
The signee must be identified by the signing API-key. Both should be provided in
a `Signature` header together with `RS256-hex`:

```
Signature: <signing api-key> RS256-hex <signature>
```

<p class="alert alert-info">
<b>Notice:</b> If the signature header is included, it should hold a correct
signature, otherwise the transaction will fail.
</p>

### RSA signature

The RSA signature is an RSASSA-PKCS1-v1_5 signature of the body. It is
represented in Hex.

If the signing API-key is `4390aec7-f76a-4c2f-8597-c87c2d06cb4f`, the signing
private key (in PEM format) is

```
-----BEGIN RSA PRIVATE KEY-----
MIIBOwIBAAJBALYK0zmwuYkH3YWcFNLLddx5cwDxEY7Gi1xITuQqRrU4yD3uSw+J
WYKknb4Tbndb6iEHY+e6gIGD+49TojnNeIUCAwEAAQJARyuYRRe4kcBHdPL+mSL+
Y0IAGkAlUyKAXYXPghidKD/v/oLrFaZWALGM2clv6UoYYpPnInSgbcud4sTcfeUm
QQIhAN2JZ2qv0WGcbIopBpwpQ5jDxMGVkmkVVUEWWABGF8+pAiEA0lySxTELZm8b
Gx9UEDRghN+Qv/OuIKFldu1Ba4f8W30CIQCaQFIBtunTTVdF28r+cLzgYW9eWwbW
pEP4TdZ4WlW6AQIhAMDCTUdeUpjxlH/87BXROORozAXocBW8bvJUI486U5ctAiAd
InviQqJd1KTGRDmWIGrE5YACVmW2JSszD9t5VKxkAA==
-----END RSA PRIVATE KEY-----
```

and the body is

```
amount=2050&currency=EUR&ip=1.1.1.1&card[number]=4111111111111111&card[expire_month]=06&card[expire_year]=2018&card[csc]=123
```

then the `Signature` header should be

```
Signature: 4390aec7-f76a-4c2f-8597-c87c2d06cb4f RS256-hex af30dfbca8ae965accde234e49f93ced184feb612faf440d12a3993bcce747b729069241dd1b6e68420607301d737c6828289b9889c38727a6cc853dbfcae103
```

In Ruby, you can calculate the RS256 Hex signature using

```
key = OpenSSL::PKey::RSA.new(key_in_pem_string)
key.sign(OpenSSL::Digest.new('sha256'), body).unpack('H*').first
```


# Examples

## Charge a cardholder

To charge a cardholder you first have to reserve money on his bank account.
Next you can transfer money from his bank account to your merchant bank
account.


### Reserve money

The following will reserve EUR 20.50 (2050 cents) on cardholder's bank account:

````shell
curl -X POST https://gateway.test.clearhaus.com/authorizations \
     -u <your-api-key>: \
     -d "amount=2050"   \
     -d "currency=EUR"  \
     -d "ip=1.1.1.1"    \
     -d "card[number]=4111111111111111" \
     -d "card[expire_month]=06"         \
     -d "card[expire_year]=2018"        \
     -d "card[csc]=123"
````

Example response (snippet):

````json
{
    "id": "84412a34-fa29-4369-a098-0165a80e8fda",
    "status": {
        "code": 20000
    },
    "csc": {
        "present": true,
        "matches": true
    },
    "processed_at": "2014-07-09T09:53:41+00:00",
    "_links": {
        "captures": { "href": "/authorizations/84412a34-fa29-4369-a098-0165a80e8fda/captures" }
    }
}
````

In order to actually transfer money from cardholder's bank account to your
merchant bank account you will have to make a capture transaction.

<p class="alert alert-info">
<b>Notice:</b> Some issuers will approve authorizations although the CSC did not
match; in this case the <code>status</code> <code>code</code> will be
<code>20000</code> but <code>csc</code> <code>matches</code> will be
<code>false</code>. Please be aware that rules to disallow captures for such
authorizations may be in place for a merchant.
</p>


### Withdraw money

The following will make a capture transaction and withdraw what you have
reserved on cardholder's bank account.

````shell
curl -X POST https://gateway.test.clearhaus.com/authorizations/84412a34-fa29-4369-a098-0165a80e8fda/captures \
     -u <your-api-key>:
````

You can withdraw a partial amount by providing an `amount` parameter:

````shell
curl -X POST https://gateway.test.clearhaus.com/authorizations/84412a34-fa29-4369-a098-0165a80e8fda/captures \
     -u <your-api-key>: \
     -d "amount=1000"
````

Example response (snippet):

````json
{
    "id": "d8e92a70-3030-4d4d-8ad2-684b230c1bed",
    "status": {
        "code": 20000
    },
    "processed_at": "2014-07-09T11:47:28+00:00",
    "amount": 1000,
    "_links": {
        "authorization": {
            "href": "/authorizations/84412a34-fa29-4369-a098-0165a80e8fda"
        },
        "refunds": {
            "href": "/authorizations/84412a34-fa29-4369-a098-0165a80e8fda/refunds"
        }
    }
}
````


## Refund to cardholder

You can refund all money or a partial amount of what you have withdrawn from
cardholder's bank account:

````shell
curl -X POST https://gateway.test.clearhaus.com/authorizations/84412a34-fa29-4369-a098-0165a80e8fda/refunds \
     -u <your-api-key>: \
     -d "amount=500"
````

Example response (snippet):

````json
{
    "id": "f04c0872-47ce-4683-8d8c-e154221bba14",
    "status": {
        "code": 20000
    },
    "processed_at": "2014-07-09T11:57:58+00:00",
    "amount": 500,
    "_links": {
        "authorization": { "href": "/authorizations/84412a34-fa29-4369-a098-0165a80e8fda" }
    }
}
````


## Tokenize a card

A card token is a value that references card details (see
[Tokenization][Tokenization]). You can use a card token (card resource) to make
authorization and credit transactions.

A card resource is automatically made when you make an authorization
transaction and supply card details. You can also make a card resource
directly:

````shell
curl -X POST https://gateway.test.clearhaus.com/cards \
     -u <your-api-key>: \
     -d "card[number]=5500000000000004" \
     -d "card[expire_month]=06"         \
     -d "card[expire_year]=2018"        \
     -d "card[csc]=123"
````

Example response (snippet):

````json
{
    "id": "58dabba0-e9ea-4133-8c38-bfa1028c1ed2",
    "status": {
        "code": 20000
    },
    "processed_at": "2014-07-09T12:14:31+00:00",
    "last4": "0004",
    "country": "US",
    "scheme": "mastercard",
    "type": "credit",
    "csc": {
        "present": true,
        "matches": true
    },
    "_links": {
        "authorizations": { "href": "/cards/58dabba0-e9ea-4133-8c38-bfa1028c1ed2/authorizations" },
        "credits": { "href": "/cards/58dabba0-e9ea-4133-8c38-bfa1028c1ed2/credits" }
    }
}
````


## Payout to cardholder

Sometimes cardholders should receive money, e.g. if you will pay out some
winnings. Before you can make a payout you need to [tokenize](#tokenize-a-card)
a card.

The following will transfer EUR 500.00 to cardholder's bank account from your
merchant bank account:

````shell
curl -X POST https://gateway.test.clearhaus.com/cards/58dabba0-e9ea-4133-8c38-bfa1028c1ed2/credits \
     -u <your-api-key>: \
     -d "amount=50000"  \
     -d "currency=EUR"
````

Example response (snippet):

````json
{
    "id": "1b377999-bafb-42b0-a24f-106b312b0b40",
    "status": {
        "code": 20000
    },
    "processed_at": "2014-07-09T12:58:56+00:00",
    "amount": 50000,
    "currency": "EUR"
}
````


## Recurring payments

Recurring payments enable you to repeatedly charge cardholders without having
them to provide card information for subsequent payments.

### Subscription concept

Many payment gateways offer a subscription concept where a card can be
subscribed for recurring payments. This is supported in our API using card
tokens. Card tokens can be created [explicitly](#tokenize-a-card) or implicitly
when the first [authorization is created](#reserve-money).

Actual recurring transactions must be made by
[creating an authorization](#authorizations).


### Repeatedly reserve money

A recurring payment is made by making an authorization based on a card
resource and setting `recurring` parameter to `true`:

````shell
curl -X POST https://gateway.test.clearhaus.com/cards/58dabba0-e9ea-4133-8c38-bfa1028c1ed2/authorizations \
     -u <your-api-key>:  \
     -d "amount=2050"    \
     -d "currency=EUR"   \
     -d "recurring=true"
````

Example response (snippet):

````json
{
   "id": "e3e9d215-6efc-4c0e-b3d7-2226057c6de8",
   "status": {
       "code": 20000
   },
   "processed_at": "2014-07-09T13:33:44+00:00",
   "recurring": true
}
````

Above can be repeated whenever you need to reserve money and must be followed
by a capture transaction.


## 3-D Secure

3-D Secure is a protocol designed to improve security for online transactions.
Before you continue please read more about this protocol at [3Dsecure.io](http://docs.3dsecure.io).

### Secure transactions

To perform a 3-D Secure transaction you make an ordinary authorization including
a `pares` value:

````shell
curl -X POST https://gateway.test.clearhaus.com/authorizations \
     -u <your-api-key>: \
     -d "amount=2050"   \
     -d "currency=EUR"  \
     -d "ip=1.1.1.1"    \
     -d "card[number]=4111111111111111" \
     -d "card[expire_month]=06"         \
     -d "card[expire_year]=2018"        \
     -d "card[csc]=123"                 \
     --data-urlencode "threed_secure[pares]=<some-pares-value>"
````

Example response (snippet):

````json
{
    "id": "84412a34-fa29-4369-a098-0165a80e8fda",
    "status": {
        "code": 20000
    },
    "processed_at": "2014-07-09T09:53:41+00:00",
    "threed_secure": true
}
````


## Fetch account information

Some basic account information can be fetched:

````shell
curl https://gateway.test.clearhaus.com/account \
     -u <your-api-key>:
````

Example response (snippet):

````json
{
    "merchant_id": "000000003000001",
    "name": "Merchant Ltd.",
    "text_on_statement": "merchant.com",
    "country": "GBR",
    "mcc": "1111"
}
````

See [account resource](#account) documentation for further details.


# API Reference


## Resources

Our API offers six different resources:

- [Authorizations](#authorizations)
- [Captures](#captures)
- [Refunds](#refunds)
- [Voids](#voids)
- [Credits](#credits)
- [Cards](#cards)
- [Account](#account)


### Authorizations

To reserve money on a cardholder's bank account you make a new authorization resource.

````
POST https://gateway.clearhaus.com/cards/:id/authorizations
POST https://gateway.clearhaus.com/authorizations
````

#### Parameters

<dl class="dl-horizontal">
  <dt>amount</dt>
  <dd>[1-9][0-9]{0,9} <br /> Amount in minor units of given currency (e.g. cents if in Euro).</dd>
  <dt>currency</dt>
  <dd>[A-Z]{3} <br /> <a target="_blank" href="currencies.txt">3-letter currency code</a>. (Some exponents differ from ISO 4217.)</dd>
  <dt>ip</dt>
  <dd>[0-9\.a-fA-F:]{3,39} <br /> <i>Optional</i> <br /> Cardholder's IP address (v4 or v6).</dd>
  <dt>recurring</dt>
  <dd>(true|false) <br /> <i>Optional</i> <br /> Must be <code>true</code> for recurring transactions.</dd>
  <dt>text_on_statement</dt>
  <dd>
    [\x20-\x7E]{0,22}
    <i><a target="_blank" href="http://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters">ASCII printable characters</a></i> </br>
    <i>May not be all digits, all same character, or all sequential characters (e.g. "abc").</i></br>
    <i>Optional</i> <br />
    Text that will be placed on cardholder's bank statement.
  </dd>
  <dt>reference</dt>
  <dd>
    [\x20-\x7E]{0,30}
    <i><a target="_blank" href="http://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters">ASCII printable characters</a></i> </br>
    <i>Optional</i> <br />
    A reference to an external object, such as an order number.
  </dd>
  <dt>threed_secure[pares]</dt>
  <dd>[:base64:] <br /> <i>Optional</i> <br /> See more information on <a target="_blank" href="http://docs.3dsecure.io">3Dsecure.io</a></dd>
  <dt>card[number]</dt>
  <dd>[0-9]{12,19} <br /> Primary account number of card to charge.</dd>
  <dt>card[expire_month]</dt>
  <dd>[0-9]{2} <br /> Expiry month of card to charge.</dd>
  <dt>card[expire_year]</dt>
  <dd>[0-9]{4} <br /> Expiry year of card to charge.</dd>
  <dt>card[csc]</dt>
  <dd>[0-9]{3} <br /> Card Security Code.</dd>
</dl>

<p class="alert alert-info">
<b>Notice:</b> The card dictionary is not required when making an authorization
based on a card resource. However, <code>card[csc]</code> should be populated
when CSC is available.
</p>


### Captures

To transfer money from a cardholder's bank account to your merchant bank
account you make a new capture resource. You can make multiple captures for an
authorization transaction.

````
POST https://gateway.clearhaus.com/authorizations/:id/captures
````

#### Parameters

<dl class="dl-horizontal">
  <dt>amount</dt>
  <dd>[1-9][0-9]{0,9} <br /> <i>Optional</i> <br />
    Amount in minor units of given currency (e.g. cents if in Euro).
    The full or remaining amount will be withdrawn if no amount is given.
  </dd>
  <dt>text_on_statement</dt>
  <dd>
    [\x20-\x7E]{0,22}
    <i><a target="_blank" href="http://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters">ASCII printable characters</a></i> </br>
    <i>May not be all digits, all same character, or all sequential characters (e.g. "abc").</i></br>
    <i>Optional</i> <br />
    Text that will be placed on cardholder's bank statement. Overrides <code>text_on_statement</code> from authorization.
  </dd>
</dl>

<p class="alert alert-info">
<b>Notice:</b> A capture cannot be made if the authorization is 180 days old.
</p>

### Refunds

To refund money to a cardholder's bank account you make a new refund resource.
You can make multiple refunds for an authorization transaction.
#### Parameters

````
POST https://gateway.clearhaus.com/authorizations/:id/refunds
````

<dl class="dl-horizontal">
  <dt>amount</dt>
  <dd>[1-9][0-9]{0,9} <br /> <i>Optional</i> <br />
    Amount in minor units of given currency (e.g. cents if in Euro).
    The full or remaining amount will be refunded if no amount is given.
  </dd>
  <dt>text_on_statement</dt>
  <dd>
    [\x20-\x7E]{0,22}
    <i><a target="_blank" href="http://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters">ASCII printable characters</a></i> </br>
    <i>May not be all digits, all same character, or all sequential characters (e.g. "abc").</i></br>
    <i>Optional</i> <br />
    Text that will be placed on cardholder's bank statement. Overrides <code>text_on_statement</code> from authorization.
  </dd>
</dl>

<p class="alert alert-info">
<b>Notice:</b> A refund does not "free up" what is captured from the
authorization; that is, after authorizing 10, capturing 5 and refunding 5, you
can still only capture 5.
</p>

<p class="alert alert-info">
<b>Notice:</b> A refund cannot be made if the last capture is 180 days old.
</p>


### Voids

To release reserved money on a cardholder's bank account you make a new void
resource. A reservation normally last for 7 days depending on issuing bank and
is then automatically released.

#### Parameters

````
POST https://gateway.clearhaus.com/authorizations/:id/voids
````

No parameters are needed to make a new void transaction.

<p class="alert alert-info">
<b>Notice:</b> A void cannot be made if the authorization is 30 days old.
</p>


### Credits

To payout (e.g. winnings and not refunds) money to a cardholder's bank account
you make a new credit resource. You must have a card resource to make a credit
transaction.

#### Parameters

````
POST https://gateway.clearhaus.com/cards/:id/credits
````

<dl class="dl-horizontal">
  <dt>amount</dt>
  <dd>[1-9][0-9]{0,9} <br />
    Amount in minor units of given currency (e.g. cents if in Euro). As for
    Mastercard, the amount must not exceed the equivalent of 5,000 EUR; as for
    Visa, the amount must not exceed the equivalent of 50,000 USD.
  </dd>
  <dt>currency</dt>
  <dd>[A-Z]{3} <br /> <a target="_blank" href="currencies.txt">3-letter currency code</a>. (Some exponents differ from ISO 4217.)</dd>
  <dt>text_on_statement</dt>
  <dd>
    [\x20-\x7E]{0,22}
    <i><a target="_blank" href="http://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters">ASCII printable characters</a></i> </br>
    <i>May not be all digits, all same character, or all sequential characters (e.g. "abc").</i></br>
    <i>Optional</i> <br />
    Text that will be placed on cardholder's bank statement.
  </dd>
  <dt>reference</dt>
  <dd>
    [\x20-\x7E]{0,30}
    <i><a target="_blank" href="http://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters">ASCII printable characters</a></i> </br>
    <i>Optional</i> <br />
    A reference to an external object, such as an order number.
  </dd>
</dl>


### Cards

A card resource (token) corresponds to a payment card and can be used to make a
credit or authorization transaction without providing sensitive card data (see
["Tokenization"][Tokenization]). A card resource must be used to make
subsequent recurring authorization transactions.

#### Parameters

````
POST https://gateway.clearhaus.com/cards
````

<dl class="dl-horizontal">
  <dt>card[number]</dt>
  <dd>[0-9]{12,19} <br /> Primary account number of card to charge.</dd>
  <dt>card[expire_month]</dt>
  <dd>[0-9]{2} <br /> Expiry month of card to charge.</dd>
  <dt>card[expire_year]</dt>
  <dd>[0-9]{4} <br /> Expiry year of card to charge.</dd>
  <dt>card[csc]</dt>
  <dd>[0-9]{3} <br /> Card Security Code.</dd>
</dl>

<p class="alert alert-info"><b>Notice:</b> The exact same card details can be
sent multiple times but will give you a unique card resource (card token).<br/>
<b>Notice:</b> A card resource is automatically made when you make an
authorization transaction and you supply card details.</p>

<p class="alert alert-warning"> <b>Notice:</b> A "zero amount"
authorization is made when POSTing to this endpoint.</p>

#### Response parameters

<dl class="dl-horizontal">
  <dt>card[last4]</dt>
  <dd>[0-9]{4} <br /> Last 4 digits of card number.</dd>
  <dt>card[scheme]</dt>
  <dd><code>visa</code>, <code>mastercard</code> or <code>unknown</code></dd>
  <dt>card[type]</dt>
  <dd><code>debit</code> or <code>credit</code>
  <br /><i>Omittable</i></dd>
  <dt>card[country]</dt>
  <dd>[A-Z]{2}
  <br /><i>Omittable</i>
  <br /> ISO 3166-1 2-letter country code for issuing bank.</dd>
</dl>

### Account

The account resource holds basic merchant account information. Only `HTTP GET`
is supported for this endpoint.

````
https://gateway.clearhaus.com/account
````


#### Response parameters

<dl class="dl-horizontal">
  <dt>merchant_id</dt>
  <dd>[0-9]{15} <br />Used for 3-D Secure and also for reference when talking
  to our support staff. For 3-D Secure it is important to represent this number
  with leading zeros.</dd>
  <dt>text_on_statement</dt>
  <dd>
    [\x20-\x7E]{0,22} 
    <i><a target="_blank" href="http://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters">ASCII printable characters</a></i> </br>
    The default text_on_statement.
  </dd>
  <dt>name</dt>
  <dd>
    [\x20-\x7E]{0,20} 
    <i><a target="_blank" href="http://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters">ASCII printable characters</a></i> </br>
    Merchant company name.
  </dd>
  <dt>country</dt>
  <dd>[A-Z]{2} <br /> ISO 3166-1 3-letter country code for merchant company.</dd>
  <dt>mcc</dt>
  <dd>[0-9]{4} <br /> Merchant category code.</dd>
  <dt>acquirer</dt>
  <dd>Used for 3-D Secure.</dd>
</dl>


## Transaction status codes

The JSON response will include one of following transaction status codes when
you make a new transaction.

Status     | `code` |  Meaning
---------- | ------ | --------
Approved   |  20000 |  Approved
Declined   |  40000 |  General input error
           |  40110 |  Invalid card number
           |  40111 |  Unsupported card scheme
           |  40120 |  Invalid CSC
           |  40130 |  Invalid expire date
           |  40135 |  Card expired
           |  40140 |  Invalid currency
           |  40150 |  Invalid text on statement
           |  40200 |  Clearhaus rule violation
           |  40300 |  3-D Secure problem
           |  40310 |  3-D Secure authentication failure
           |  40400 |  Backend problem
           |  40410 |  Declined by issuer or card scheme
           |  40411 |  Card restricted
           |  40412 |  Card lost or stolen
           |  40413 |  Insufficient funds
           |  40414 |  Suspected fraud
           |  40415 |  Amount limit exceeded
           |  50000 |  Clearhaus error


### Status message

A status message is included in every response when you make a new transaction.
The status message can be used for debugging and may include a more specific
error message.

Examples:

````json
{
    "status": {
        "code": 40000,
        "message": "parameter 'amount' is required"
    }
}

{
    "status": {
        "code": 40200,
        "message": "amount > 100 EUR"
    }
}

{
    "status": {
        "code": 40200,
        "message": "not (fully 3dsecure or subsequent recurring)"
    }
}
````

## Test card numbers

Any card number within the following
[BIN ranges](https://en.wikipedia.org/wiki/Payment_card_number#Issuer_identification_number_.28IIN.29)
can be used to perform test transactions on `gateway.test.clearhaus.com`:

Range           | Card scheme |
--------------- | ----------- |
222100 - 272099 | MasterCard  |
400000 - 499999 | Visa        |
500000 - 699999 | MasterCard  |

<p class="alert alert-danger">
Please use PANs that are **not**
[LUHN compliant](https://en.wikipedia.org/wiki/Luhn_algorithm) or one of the
following special PANs: 2221000000000009, 4111111111111111, 5500000000000004.
</p>

You can specify a status `code` as transaction amount to trigger a specific
error.


## Endpoint summary


````shell
# authorizations
https://gateway.clearhaus.com/authorizations
https://gateway.clearhaus.com/authorizations/:id
https://gateway.clearhaus.com/cards/:id/authorizations

# captures
https://gateway.clearhaus.com/captures/:id
https://gateway.clearhaus.com/authorizations/:id/captures

# voids
https://gateway.clearhaus.com/voids/:id
https://gateway.clearhaus.com/authorizations/:id/voids

# refunds
https://gateway.clearhaus.com/refunds/:id
https://gateway.clearhaus.com/authorizations/:id/refunds

# credits
https://gateway.clearhaus.com/credits/:id
https://gateway.clearhaus.com/cards/:id/credits

# cards
https://gateway.clearhaus.com/cards
https://gateway.clearhaus.com/cards/:id

# account
https://gateway.clearhaus.com/account
````


[JSON-HAL]: http://tools.ietf.org/html/draft-kelly-json-hal "IETF HAL draft"
[HATEOAS]: http://en.wikipedia.org/wiki/HATEOAS
[Tokenization]: http://en.wikipedia.org/wiki/Tokenization_(data_security)
[3D-Secure]: http://www.3dsecure.io
