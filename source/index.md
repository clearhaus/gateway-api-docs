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

````json
{
    "status" : {
        "code": 40000,
        "message": "invalid API key"
    }
}
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
        "credits":        { "href": "/credits" }
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

Before you can charge a cardholder you need to reserve money on his bank
acount.

### Step 1: Reserve money

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

The money is not yet withdrawn from cardholder's bank account. In order to
actually move money from cardholder's bank account to your merchant bank
account you will have to make a capture transaction.

### Step 2: Withdraw money

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


## Release reserved money

In case you will not withdraw an amount you already have reserved you can void
(release) your reservation:

````shell
curl -X POST https://gateway.clearhaus.com/authorizations/:id/voids \
     -u <your-api-key>:
````

Example response:

````json
{
    "id": "6898688b-b026-4121-a815-323a1a70cf5e",
    "status": {
        "code": 20000
    },
    "_links": {
        "self":           { "href": "/voids/6898688b-b026-4121-a815-323a1a70cf5e" },
        "authorization":  { "href": "/authorization/3b6b0ed6-cbe0-4b60-9e7d-9560cfc98d59" }
    }
}
````


## Payout to cardholder

Before you can make a payout to a customer you need to
[tokenize](#tokenize-card) his card. A card is automatically tokenized when you
make an authorization transaction or can be tokenized using our `/cards`
endpoint.

The following will transfer EUR 20.50 to cardholder's bank account from your
merchant bank account:

````shell
curl -X POST https://gateway.clearhaus.com/cards/:id/credits \
     -u <your-api-key>: \
     -d "amount=2050"   \
     -d "currency=EUR"
````

# API Reference

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
