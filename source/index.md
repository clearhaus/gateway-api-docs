---
title: Clearhaus Transaction API Documentation
---

# Getting Started

You need an API key before you can interact with our API.

<p class="alert alert-danger">
API keys comes with many privileges so keep them secret.
</p>


## Authentication

Authentication is done via HTTP Basic Auth. Simply provide your API key as user
name and a blank string as password. Remember colon `:` after user name when
using cURL to specify an empty password.

````shell
curl https://gateway.clearhaus.com \
     -u <your-api-key>:
````

You will get this response when you provide an invalid API key:

````http
HTTP/1.1 401 Not Authorized
````


## Resource discovery

The API follows [HATEOAS][HATEOAS] principle of REST which means all resources are
discoverable.

```shell
curl https://gateway.clearhaus.com \
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
Content-Type: application/vnd.clearhaus-gateway.hal+json; version=0.1.0; charset=utf-8
````

We use HTTP response codes to indicate API errors:

````
Number  Text                 
200     OK                   
201     Created              
400     Bad Request          
401     Unauthorized         
404     Not Found            
500     Internal Server Error
````


# Examples

## Charge a cardholder

To charge a cardholder you first have to reserve money on his bank account.
Next you can transfer money from cardholder's bank account to your merchant
bank account.

### Reserve money

The following will reserve EUR 20.50 on cardholder's bank account:

````shell
curl -X POST https://gateway.clearhaus.com/authorizations \
     -u <your-api-key>: \
     -d "amount=2050"   \
     -d "currency=EUR"  \
     -d "ip=1.1.1.1"    \
     -d "card[number]=4111111111111111" \
     -d "card[expire_month]=06"         \
     -d "card[expire_year]=2018"        \
     -d "card[csc]=123"
````

In order to actually transfer money from cardholder's bank account to your
merchant bank account you will have to make a capture transaction.

### Withdraw money

The following will make a capture transaction and withdraw what you have
reserved on cardholder's bank account.

````shell
curl -X POST https://gateway.clearhaus.com/authorizations/:id/captures \
     -u <your-api-key>:
````

You can withdraw a partial amount by providing an `amount` parameter:

````shell
curl -X POST https://gateway.clearhaus.com/authorizations/:id/captures \
     -u <your-api-key>: \
     -d "amount=1000"
````


## Refund to cardholder

You can refund all money or a partial amount of what you have withdrawn from
cardholder's bank account:

````shell
curl -X POST https://gateway.clearhaus.com/captures/:id/refunds \
     -u <your-api-key>: \
     -d "amount=1000"
````

Example response:

````json
{
    "id": "6898688b-b026-4121-a815-323a1a70cf5e",
    "status": {
        "code": 20000
    },
    "_links": {
        "self":     { "href": "/refunds/6898688b-b026-4121-a815-323a1a70cf5e" },
        "capture":  { "href": "/capture/3b6b0ed6-cbe0-4b60-9e7d-9560cfc98d59" }
    }
}
````


## Payout to cardholder

Sometimes cardholders should receive money, e.g. if you will pay out some
winnings. Before you can make a payout you need to [tokenize](#tokenize-a-card)
a card.

The following will transfer EUR 20.50 to cardholder's bank account from your
merchant bank account:

````shell
curl -X POST https://gateway.clearhaus.com/cards/:id/credits \
     -u <your-api-key>: \
     -d "amount=2050"   \
     -d "currency=EUR"
````

## Tokenize a card

A card token is a value that references sensitive card data (see
["Tokenization"][Tokenization]). You can use a card token to make authorization
and credit transactions.

A card token is automatically made when you make an authorization transaction
and you send us card details. You can also make a card token directly by
creating a new `card` resource:

````shell
curl -X POST https://gateway.clearhaus.com/cards \
     -u <your-api-key>: \
     -d "card[number]=4111111111111111" \
     -d "card[expire_month]=06"         \
     -d "card[expire_year]=2018"        \
     -d "card[csc]=123"
````


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
  <dd>[0-9]{1,11} <br /> Amount in minor units of given currency (e.g. cents if in Euro).</dd>
  <dt>currency</dt>
  <dd>[A-Z]{3} <br /> ISO 4217 3-letter currency code.</dd>
  <dt>ip</dt>
  <dd>[0-9\.a-fA-F:]{3,39} <br /> Cardholder's IP address (v4 or v6).</dd>
  <dt>recurring</dt>
  <dd>(true|false) <br /> <i>Optional</i> <br /> Must be <code>true</code> for recurring transactions.</dd>
  <dt>text_on_statement</dt>
  <dd>[:print:]{1,22} <br /> <i>Optional</i> <br /> Text that will be placed on cardholder's bank statement.</dd>
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
  <dd>[1-9][0-9]{0,10} <br /> <i>Optional</i> <br />
    Amount in minor units of given currency (e.g. cents if in Euro).
    The full or remaining amount will be withdrawn if no amount is given.
  </dd>
  <dt>text_on_statement</dt>
  <dd>[:print:]{1,22} <br /> <i>Optional</i> <br />
    Text that will be placed on cardholder's bank statement. Overrides <code>text_on_statement</code> from authorization.
  </dd>
</dl>


### Refunds

To refund money to a cardholder's bank account you make a new refund resource.
You can make multiple refunds for a capture transaction.

#### Parameters

````
POST https://gateway.clearhaus.com/captures/:id/refunds
````

<dl class="dl-horizontal">
  <dt>amount</dt>
  <dd>[1-9][0-9]{0,10} <br /> <i>Optional</i> <br />
    Amount in minor units of given currency (e.g. cents if in Euro).
    The full or remaining amount will be refunded if no amount is given.
  </dd>
  <dt>text_on_statement</dt>
  <dd>[:print:]{1,22} <br /> <i>Optional</i> <br />
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
  <dd>[0-9]{1,11} <br /> Amount in minor units of given currency (e.g. cents if in Euro).</dd>
  <dt>currency</dt>
  <dd>[A-Z]{3} <br /> ISO 4217 3-letter currency code.</dd>
  <dt>text_on_statement</dt>
  <dd>[:print:]{1,22} <br /> <i>Optional</i> <br /> Text that will be placed on cardholder's bank statement.</dd>
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

<p class="alert alert-info"> <b>Notice:</b> A card resource is automatically made
when you make an authorization transaction and you send us card details. </p>


## Transaction status codes

The JSON response will include one of following transaction status codes when
you make a new transaction.

Status     | `code` |  Meaning
---------- | ------ | --------
Approved   |  20000 |  Approved
Challenged |  20200 |  Approved but be suspicious
Declined   |  40000 |  General input error
           |  40101 |  Problem with card number
           |  40102 |  Problem with CSC
           |  40103 |  Card expired
           |  40104 |  Invalid expiry date
           |  40200 |  Declined by Firewall
           |  40201 |  3D Secure is required
           |  40300 |  Problem with 3D Secure
           |  40400 |  Risk limit exceeded
           |  50000 |  Clearhaus error
           |  50100 |  General card problem

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
        "self": { "href": "https://gateway.clearhaus.com/refunds?page=2&per_page=10" },
        "next": { "href": "https://gateway.clearhaus.com/refunds?page=3&per_page=10" },
        "prev": { "href": "https://gateway.clearhaus.com/refunds?page=1&per_page=10" }
    }
}
````


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
https://gateway.clearhaus.com/captures/:id/refunds

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
