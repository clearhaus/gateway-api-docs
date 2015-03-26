---
title: Clearhaus Transaction API Documentation
---

# Getting Started

You need an API key before you can interact with our API. Send an E-mail to <a href="mailto:support@clearhaus.com">support@clearhaus.com</a> to request an API key.

<p class="alert alert-danger">
API keys comes with many privileges so keep them secret.
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
        "captures":       { "href": "/captures" },
        "refunds":        { "href": "/refunds" },
        "voids":          { "href": "/voids" },
        "credits":        { "href": "/credits" },
        "cards":          { "href": "/cards" }
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
    "processed_at": "2014-07-09T09:53:41+00:00",
    "_links": {
        "captures": { "href": "/authorizations/84412a34-fa29-4369-a098-0165a80e8fda/captures" }
    }
}
````

In order to actually transfer money from cardholder's bank account to your
merchant bank account you will have to make a capture transaction.


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
    "scheme": "mastercard",
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

Recurring payments enables you to repeatedly charge cardholders without having
them to provide card information for subsequent payments.

### Subscription concept

Many payment gateways offer a subscription concept where a card can be
subscribed for recurring payments. This is supported by our [card
resource](#cards) concept.

A payment card is subscribed simply by [making a card resource](#tokenize-a-card).


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
Before you continue please read more about this protocol at [3Dsecure.io](http://docs.3dsecure.io)

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

<p class="alert alert-info">
<b>Notice:</b> To get the PARes you need acquirer's 3-D Secure bank
identification number and an ID for the merchant. In mpi.3dsecure.io, these two
values are <code class="prettyprint">merchant[acquirer_bin]</code> and <code
class="prettyprint">merchant[id]</code>, respectively; see  <a
href="http://docs.3dsecure.io">docs.3dsecure.io</a>.
<br />
Clearhaus BIN for MasterCard: <code class="prettyprint">merchant[acquirer_bin] = 526571</code>.
<br />
Clearhaus BIN for Visa: Not available yet. Verified by Visa is not yet possible.
<br />
Merchant ID: FIXME refer to <code class="prettyprint">/me</code>-ish endpoint.
</p>

# API Reference


## Resources

Our API offers six different resources:

- [Authorizations](#authorizations)
- [Captures](#captures)
- [Refunds](#refunds)
- [Voids](#voids)
- [Credits](#credits)
- [Cards](#cards)


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
  <dd>[A-Z]{3} <br /> ISO 4217 3-letter currency code.</dd>
  <dt>ip</dt>
  <dd>[0-9\.a-fA-F:]{3,39} <br /> <i>Optional</i> <br /> Cardholder's IP address (v4 or v6).</dd>
  <dt>recurring</dt>
  <dd>(true|false) <br /> <i>Optional</i> <br /> Must be <code>true</code> for recurring transactions.</dd>
  <dt>text_on_statement</dt>
  <dd>
    [\x20-\x7E]{0,22}
    <i><a target="_blank" href="http://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters">ASCII printable characters</a></i> </br>
    <i>Optional</i> <br />
    Text that will be placed on cardholder's bank statement.
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
<b>Notice:</b> The card dictionary is not required when making an authorization based on a card resource.
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
    <i>Optional</i> <br />
    Text that will be placed on cardholder's bank statement. Overrides <code>text_on_statement</code> from authorization.
  </dd>
</dl>


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
    <i>Optional</i> <br />
    Text that will be placed on cardholder's bank statement.
  </dd>
</dl>


### Voids

To release reserved money on a cardholder's bank account you make a new void
resource. A reservation normally last for 7 days depending on issuing bank and
is then automatically released.

#### Parameters

````
POST https://gateway.clearhaus.com/authorizations/:id/voids
````

No parameters are needed to make a new void transaction.


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
  <dd>[1-9][0-9]{0,9} <br /> Amount in minor units of given currency (e.g. cents if in Euro).</dd>
  <dt>currency</dt>
  <dd>[A-Z]{3} <br /> ISO 4217 3-letter currency code.</dd>
  <dt>text_on_statement</dt>
  <dd>
    [\x20-\x7E]{0,22}
    <i><a target="_blank" href="http://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters">ASCII printable characters</a></i> </br>
    <i>Optional</i> <br />
    Text that will be placed on cardholder's bank statement.
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

## Transaction status codes

The JSON response will include one of following transaction status codes when
you make a new transaction.

Status     | `code` |  Meaning
---------- | ------ | --------
Approved   |  20000 |  Approved
Declined   |  40000 |  General input error
           |  40110 |  Invalid card number
           |  40120 |  Invalid CSC
           |  40130 |  Invalid expire date
           |  40135 |  Card expired
           |  40140 |  Invalid currency
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

````json
{
    "status" : {
        "code": 40000,
        "message": "parameter 'amount' is required"
    }
}
````

## Test card numbers

The following test card numbers can be used to perform test transactions:

Card scheme | Card number      | Note     |
------------| ---------------- | -------- |
Visa        | 4111111111111111 | Approved |
Visa        | 4200000000000000 | Declined |
MasterCard  | 5500000000000004 | Approved |
MasterCard  | 5555555555554444 | Declined |

You can specify a status `code` as transaction amount to trigger a specific
error when using declined test card numbers.


## Pagination

Resource collections are automatically paginated with most recent resource appearing first.

Example:

````
GET https://gateway.clearhaus.com/refunds?page=2&per_page=10
````

Example response:

````json
{
    "count": 876,
    "_embedded": {
        "refunds": [ .... ]
    },
    "_links": {
        "self": { "href": "/refunds?page=2&per_page=10" },
        "next": { "href": "/refunds?page=3&per_page=10" },
        "prev": { "href": "/refunds?page=1&per_page=10" }
    }
}
````

The `per_page` parameter is automatically set to 10 when undefined and can maximum be 100.


## Endpoint summary


````shell
# authorizations
https://gateway.clearhaus.com/authorizations
https://gateway.clearhaus.com/authorizations/:id
https://gateway.clearhaus.com/cards/:id/authorizations

# captures
https://gateway.clearhaus.com/captures
https://gateway.clearhaus.com/captures/:id/
https://gateway.clearhaus.com/authorizations/:id/captures

# voids
https://gateway.clearhaus.com/voids
https://gateway.clearhaus.com/voids/:id
https://gateway.clearhaus.com/authorizations/:id/voids

# refunds
https://gateway.clearhaus.com/refunds
https://gateway.clearhaus.com/refunds/:id
https://gateway.clearhaus.com/authorizations/:id/refunds

# credits
https://gateway.clearhaus.com/credits
https://gateway.clearhaus.com/credits/:id
https://gateway.clearhaus.com/cards/:id/credits

# cards
https://gateway.clearhaus.com/cards
https://gateway.clearhaus.com/cards/:id
````


[JSON-HAL]: http://tools.ietf.org/html/draft-kelly-json-hal "IETF HAL draft"
[HATEOAS]: http://en.wikipedia.org/wiki/HATEOAS
[Tokenization]: http://en.wikipedia.org/wiki/Tokenization_(data_security)
[3D-Secure]: http://www.3dsecure.io
