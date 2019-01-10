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
Content-Type: application/vnd.clearhaus-gateway.hal+json; version=0.10.0; charset=utf-8
````

where the version follows [Semantic Versioning](http://semver.org).

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

The signature is an RSA signature of the HTTP body; it is represented in hex.
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
represented in hex.

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
amount=2050&currency=EUR&ip=1.1.1.1&card[pan]=4111111111111111&card[expire_month]=06&card[expire_year]=2022&card[csc]=123
```

then the `Signature` header should be

```
Signature: 4390aec7-f76a-4c2f-8597-c87c2d06cb4f RS256-hex 7ae0e14d35b2a15a7ff812a1899d7f0a5d28063f0c276081876a51fc3773f499459f944f8b57c6e0e76b47c218b20ebaad7c6250dcd1804dd19c87fb7f1216ba
```

In Ruby, you can calculate the RS256 hex signature using

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
     -d "card[pan]=4111111111111111" \
     -d "card[expire_month]=06"      \
     -d "card[expire_year]=2022"     \
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
    "processed_at": "2018-07-09T12:58:56+00:00",
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
curl -X POST \
  https://gateway.test.clearhaus.com/authorizations/84412a34-fa29-4369-a098-0165a80e8fda/captures \
  -u <your-api-key>:
````

You can withdraw a partial amount by providing an `amount` parameter:

````shell
curl -X POST \
  https://gateway.test.clearhaus.com/authorizations/84412a34-fa29-4369-a098-0165a80e8fda/captures \
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
    "processed_at": "2018-07-09T12:58:56+00:00",
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
curl -X POST \
  https://gateway.test.clearhaus.com/authorizations/84412a34-fa29-4369-a098-0165a80e8fda/refunds \
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
    "processed_at": "2018-07-09T12:58:56+00:00",
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
     -d "card[pan]=5500000000000004" \
     -d "card[expire_month]=06"      \
     -d "card[expire_year]=2022"     \
     -d "card[csc]=123"
````

Example response (snippet):

````json
{
    "id": "58dabba0-e9ea-4133-8c38-bfa1028c1ed2",
    "status": {
        "code": 20000
    },
    "processed_at": "2018-07-09T12:58:56+00:00",
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
winnings.

The following will transfer EUR 500.00 to cardholder's bank account from your
merchant bank account:

````shell
curl -X POST https://gateway.test.clearhaus.com/credits \
     -u <your-api-key>: \
     -d "amount=50000"  \
     -d "currency=EUR"  \
     -d "ip=1.1.1.1"    \
     -d "card[pan]=4111111111111111" \
     -d "card[expire_month]=06"      \
     -d "card[expire_year]=2022"
````

Example response (snippet):

````json
{
    "id": "1b377999-bafb-42b0-a24f-106b312b0b40",
    "status": {
        "code": 20000
    },
    "processed_at": "2018-07-09T12:58:56+00:00",
    "amount": 50000,
    "currency": "EUR",
    "_embedded": { "card": { "id": "58dabba0-e9ea-4133-8c38-bfa1028c1ed2" } }
}
````


## Recurring payments

Recurring payments enable you to repeatedly charge cardholders without having
them to provide card information for subsequent payments.

### Subscription concept

Many PSPs have a subscription concept for supporting recurring payments.
The first approved authorization is the initial recurring authorization (also
known as "first in series"), all later authorizations are called subsequent
authorizations. Clearhaus supports subscriptions in the form of recurring
payments.

### Repeatedly reserve money

A recurring payment is made by making an authorization and setting `recurring`
parameter to `true`. The first recurring payment for a given card could be made
this way (notice that the amount may be zero):

````shell
curl -X POST \
  https://gateway.test.clearhaus.com/authorizations \
  -u <your-api-key>:  \
  -d "amount=2050"    \
  -d "currency=EUR"   \
  -d "recurring=true" \
  -d "card[pan]=4111111111111111" \
  -d "card[expire_month]=06"      \
  -d "card[expire_year]=2022"     \
  -d "card[csc]=123"              \
  --data-urlencode "card[pares]=<some-pares-value>"
````

Example response (snippet):

````json
{
    "id": "e3e9d215-6efc-4c0e-b3d7-2226057c6de8",
    "status": {
        "code": 20000
    },
    "processed_at": "2018-07-09T12:58:56+00:00",
    "recurring": true,
    "_embedded": { "card": { "id": "58dabba0-e9ea-4133-8c38-bfa1028c1ed2" } }
}
````

This should be followed by a capture except when the amount is `0`.

Subsequent authorizations are made similarly, but neither CSC nor PARes (see
[3-D Secure](#3-d-secure)) would be included.

An initial recurring authorization can also be made using the `applepay` and
`mobilepayonline` payment methods; subsequent recurring payments, however, must
be made using the `card` payment method using the card details of the initial
recurring authorization.


## 3-D Secure

3-D Secure is a protocol designed to improve security for online transactions.
Before you continue please read more about this protocol at
[3Dsecure.io](http://docs.3dsecure.io).

3-D Secure is the only way to achieve liability shift for fraud chargebacks.

### Secure transactions

To perform a 3-D Secure transaction you make an ordinary authorization including
a `pares` value:

````shell
curl -X POST https://gateway.test.clearhaus.com/authorizations \
     -u <your-api-key>: \
     -d "amount=2050"   \
     -d "currency=EUR"  \
     -d "ip=1.1.1.1"    \
     -d "card[pan]=4111111111111111" \
     -d "card[expire_month]=06"      \
     -d "card[expire_year]=2022"     \
     -d "card[csc]=123"              \
     --data-urlencode "card[pares]=<some-pares-value>"
````

Example response (snippet):

````json
{
    "id": "84412a34-fa29-4369-a098-0165a80e8fda",
    "status": {
        "code": 20000
    },
    "processed_at": "2018-07-09T12:58:56+00:00",
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
    "country": "GB",
    "mcc": "1111",
    "descriptor": "merchant.com",
    "transaction_rules":"reject authorization if amount > 100 EUR and (not fully 3dsecure)",
    "acquirer": {
        "visa_bin": 438309,
        "mastercard_bin": 526571
    }
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
POST https://gateway.clearhaus.com/authorizations
POST https://gateway.clearhaus.com/cards/:id/authorizations # deprecated
````

Authorizations can be created using different payment methods:
`card`, `applepay`, `googlepay`, `mobilepayonline`.
Exactly one payment method must be used, unless the authorization is made on
a card resource (`/cards/:id/authorizations`, deprecated), in which case the
payment method must be omitted.

#### Parameters

<dl class="dl-horizontal">
  <dt>amount</dt>
  <dd>[0-9]{1,10} <br /> Amount in minor units of given currency (e.g. cents if in Euro).</dd>
  <dt>currency</dt>
  <dd>[A-Z]{3} <br /> <a target="_blank" href="currencies.txt">3-letter currency code</a>. (Some exponents differ from ISO 4217.)</dd>
  <dt>ip</dt>
  <dd>[0-9\.a-fA-F:]{3,39} <br /> <i>Optional</i> <br /> Cardholder's IP address (v4 or v6).</dd>
  <dt>recurring</dt>
  <dd>(true|false) <br /> <i>Optional</i> <br /> Must be <code>true</code> for recurring payments.</dd>
  <dt>text_on_statement</dt>
  <dd>
    [\x20-\x7E]{2,22}
    <i><a target="_blank" href="http://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters">ASCII printable characters</a></i> <br />
    <i>May not be all digits, all same character, or all sequential characters (e.g. "abc").</i><br />
    <i>Optional</i> <br />
    Text that will be placed on cardholder's bank statement.
  </dd>
  <dt>reference</dt>
  <dd>
    [\x20-\x7E]{1,30}
    <i><a target="_blank" href="http://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters">ASCII printable characters</a></i> <br />
    <i>Optional</i> <br />
    A reference to an external object, such as an order number.
  </dd>

  <!-- deprecated -->
  <dt><strike>threed_secure[pares]</strike></dt>
  <dd>
    Deprecated! Please use <code>card[pares]</code>. <br />
    [:base64:] <br />
    See more information at <a target="_blank" href="http://docs.3dsecure.io">3Dsecure.io</a>.
  </dd>
  <dt><strike>card[number]</strike></dt>
  <dd>
    Deprecated! Please use <code>card[pan]</code>. <br />
    [0-9]{12,19} <br />
    Primary account number of card to charge.
  </dd>
</dl>

---
##### **Method**: `card`

<dl>
  <dt>card[pan]</dt>
  <dd>[0-9]{12,19} <br /> Primary account number of card to charge.</dd>
  <dt>card[expire_month]</dt>
  <dd>[0-9]{2} <br /> Expiry month of card to charge.</dd>
  <dt>card[expire_year]</dt>
  <dd>20[0-9]{2} <br /> Expiry year of card to charge.</dd>
  <dt>card[csc]</dt>
  <dd>
    [0-9]{3} <br />
    <i>Optional when transaction is signed and partner is trusted.</i> <br />
    Card Security Code.
  </dd>
  <dt>card[pares]</dt>
  <dd>[:base64:] <br /> <i>Optional</i> <br /> See more information at <a target="_blank" href="http://docs.3dsecure.io">3Dsecure.io</a></dd>
</dl>

<p class="alert alert-info">
  <b>Notice:</b> An approved authorization that includes
  <code>card[pares]</code> is 3-D
  Secured and is strongly authenticated (SCA in PSD2).
  <br />
  <b>Notice:</b> An authorization that includes <code>card[pares]</code> and/or
  <code>card[csc]</code> cannot be a subsequent recurring authorization.
</p>

---
##### **Method**: `applepay`

Apple Pay requires the payment details (PAN, expiry, etc.) of the payment token
to be decrypted by a symmetric key.
Your systems must derive this symmetric key using the payment token's ephemeral
public key, the merchant's private key and the merchant ID. For this, we refer
to [our reference implementation](https://github.com/clearhaus/pedicel) written
in Ruby; see [Apple's documentation for the <code>PaymentToken</code>
object][ApplePay-PaymentToken] for more information.

<dl>
  <dt>applepay[payment_token]</dt>
  <dd>[:json:] <br /> Full, raw <code>PKPaymentToken</code> object, UTF-8 encoded serialization of a JSON dictionary.</dd>
  <dt>applepay[symmetric_key]</dt>
  <dd>[:hex:] <br /> Symmetric AES key (unique per transaction) that can
    decrypt <code>data</code> from the <code>PKPaymentToken</code>.</dd>
</dl>

<p class="alert alert-info">
  <b>Notice:</b> Signing is required to use the <code>applepay</code> payment
  method.
  <br />
  <b>Notice:</b> An authorization made with <code>applepay</code> is
  strongly authenticated (SCA in PSD2).
  <br />
  <b>Notice:</b> An authorization made with <code>applepay</code> may be fully
  3-D Secured, 3-D Secure attempted, or with no 3-D Secure; this is indicated by
  the <code>eciIndicator</code> of the <code>applepay[payment_token]</code>.
  <br />
  <b>Notice:</b> An authorization made with <code>applepay</code> cannot be a
  subsequent recurring authorization.
</p>


---
##### **Method**: `googlepay`

To accept a payment using Google Pay, apart from the complete payment method
token and merchant ID, the derived shared secret is required.
Please refer to the [official documentation][GooglePay-PaymentCryptography].

<dl>
  <dt>googlepay[token]</dt>
  <dd>[:json:]<br />Raw payment method token as received in response from Google. UTF-8
    encoded serialization of a JSON dictionary.</dd>
  <dt>googlepay[shared_secret]</dt>
  <dd>[:base64:]<br />The shared secret derived from the ephemeral public key and
    your private key.</dd>
  <dt>googlepay[merchant_id]</dt>
  <dd>[:string:]<br />The ID of the merchant, string matching the format `merchant:<ID>`.</dd>
</dl>

<p class="alert alert-info">
  <b>Notice:</b> Signing is required to use the <code>googlepay</code> payment
  method.
  <br />
  <b>Notice:</b> An authorization made with <code>googlepay</code> may be fully
  3-D Secured, 3-D Secure attempted, or with no 3-D Secure; this is indicated by
  the <code>eciIndicator</code> of the <code>paymentMethodDetails</code>.
  <br />
  <b>Notice:</b> An authorization made with <code>googlepay</code> cannot be a
  subsequent recurring authorization.
</p>

---
##### **Method**: `mobilepayonline`

<dl>
  <dt>mobilepayonline[pan]</dt>
  <dd>[0-9]{12,19} <br /> Primary account number of card to charge.</dd>
  <dt>mobilepayonline<br />[expire_month]</dt>
  <dd>[0-9]{2} <br /> Expiry month of card to charge.</dd>
  <dt>mobilepayonline<br />[expire_year]</dt>
  <dd>[0-9]{4} <br /> Expiry year of card to charge.</dd>
  <dt>mobilepayonline<br />[phone_number]</dt>
  <dd>
    [\x20-\x7E]{1,15} <br />
    <i>Optional</i> <br />
    Phone number from where the PAN originates.
  </dd>
  <dt>mobilepayonline[pares]</dt>
  <dd>[:base64:] <br /> <i>Optional</i> <br /> See more information at <a target="_blank" href="http://docs.3dsecure.io">3Dsecure.io</a></dd>
</dl>

<p class="alert alert-info">
  <b>Notice:</b> Signing is required to use the <code>mobilepayonline</code>
  payment method.
  <br />
  <b>Notice:</b> An authorization made with <code>mobilepayonline</code> is
  strongly authenticated (SCA in PSD2).
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
    [\x20-\x7E]{2,22}
    <i><a target="_blank" href="http://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters">ASCII printable characters</a></i> <br />
    <i>May not be all digits, all same character, or all sequential characters (e.g. "abc").</i><br />
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
    [\x20-\x7E]{2,22}
    <i><a target="_blank" href="http://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters">ASCII printable characters</a></i> <br />
    <i>May not be all digits, all same character, or all sequential characters (e.g. "abc").</i><br />
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
<b>Notice:</b> A void cannot be made if the authorization age is 30 days or more.
</p>


### Credits

To payout (e.g. winnings and not refunds) money to a cardholder's bank account
you make a new credit resource.

#### Parameters

````
POST https://gateway.clearhaus.com/credits
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
    [\x20-\x7E]{2,22}
    <i><a target="_blank" href="http://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters">ASCII printable characters</a></i> <br />
    <i>May not be all digits, all same character, or all sequential characters (e.g. "abc").</i><br />
    <i>Optional</i> <br />
    Text that will be placed on cardholder's bank statement.
  </dd>
  <dt>reference</dt>
  <dd>
    [\x20-\x7E]{1,30}
    <i><a target="_blank" href="http://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters">ASCII printable characters</a></i> <br />
    <i>Optional</i> <br />
    A reference to an external object, such as an order number.
  </dd>
  <dt>card[pan]</dt>
  <dd>[0-9]{12,19} <br /> Primary account number of card to charge.</dd>
  <dt>card[expire_month]</dt>
  <dd>[0-9]{2} <br /> Expiry month of card to charge.</dd>
  <dt>card[expire_year]</dt>
  <dd>20[0-9]{2} <br /> Expiry year of card to charge.</dd>
  <dt>card[csc]</dt>
  <dd>[0-9]{3} <br /> <i>Optional.</i> <br /> Card Security Code.</dd>
</dl>


#### Parameters (deprecated)

````
POST https://gateway.clearhaus.com/cards/:id/credits # deprecated
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
    [\x20-\x7E]{2,22}
    <i><a target="_blank" href="http://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters">ASCII printable characters</a></i> <br />
    <i>May not be all digits, all same character, or all sequential characters (e.g. "abc").</i><br />
    <i>Optional</i> <br />
    Text that will be placed on cardholder's bank statement.
  </dd>
  <dt>reference</dt>
  <dd>
    [\x20-\x7E]{1,30}
    <i><a target="_blank" href="http://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters">ASCII printable characters</a></i> <br />
    <i>Optional</i> <br />
    A reference to an external object, such as an order number.
  </dd>
</dl>


### Cards

This resource is now deprecated!

A card resource (token) corresponds to a payment card and can be used to make a
credit or authorization transaction without providing sensitive card data (see
["Tokenization"][Tokenization]).

#### Parameters

````
POST https://gateway.clearhaus.com/cards
````

<dl class="dl-horizontal">
  <dt>card[pan]</dt>
  <dd>[0-9]{12,19} <br /> Primary account number of card to charge.</dd>
  <dt>card[number]</dt>
  <dd>[0-9]{12,19} <br /> Primary account number of card to charge.</dd>
  <dt>card[expire_month]</dt>
  <dd>[0-9]{2} <br /> Expiry month of card to charge.</dd>
  <dt>card[expire_year]</dt>
  <dd>20[0-9]{2} <br /> Expiry year of card to charge.</dd>
  <dt>card[csc]</dt>
  <dd>
    [0-9]{3} <br />
    <i>Optional when transaction is signed and partner is trusted.</i> <br />
    Card Security Code.
  </dd>
</dl>

<p class="alert alert-info">
    <b>Notice:</b> The exact same card details can be sent multiple times but
    will give you the same card resource (card token) every time.
    <br />
    <b>Notice:</b> A card resource is automatically made when you make an
    authorization transaction and you supply card details.
</p>

<p class="alert alert-warning">
    <b>Notice:</b> A "zero amount" authorization is made when POSTing to this
    endpoint.
</p>

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
GET https://gateway.clearhaus.com/account
````


#### Response parameters

<dl class="dl-horizontal">
  <dt>merchant_id</dt>
  <dd>[0-9]{15} <br />Used for 3-D Secure and also for reference when talking
  to our support staff. For 3-D Secure it is important to represent this number
  with leading zeros.</dd>
  <dt>descriptor</dt>
  <dd>
    [\x20-\x7E]{0,22}
    <i><a target="_blank" href="http://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters">ASCII printable characters</a></i> <br />
    The default <code>text_on_statement</code>.
  </dd>
  <dt>name</dt>
  <dd>
    [\x20-\x7E]{0,20} 
    <i><a target="_blank" href="http://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters">ASCII printable characters</a></i> <br />
    Merchant company name.
  </dd>
  <dt>country</dt>
  <dd>[A-Z]{2} <br /> ISO 3166-1 2-letter country code for merchant company.</dd>
  <dt>mcc</dt>
  <dd>[0-9]{4} <br /> Merchant category code.</dd>
  <dt>acquirer</dt>
  <dd>Used for 3-D Secure.</dd>
  <dt>transaction_rules</dt>
  <dd>[\x20-\x7E]* <br /> The processing rules that the merchant's transactions must adhere to.</dd>

  <!-- deprecated -->
  <dt><strike>text_on_statement</strike></dt>
  <dd>Deprecated! Please refer to <code>descriptor</code>.</dd>
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
           |  40190 |  Invalid transaction
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

A status message may be included in the response when you create a new
transaction.
The status message can be used for debugging and may include a more specific
error message.

Status messages should be shown to the merchant.

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
        "message": "amount > 100 EUR and (not strongly authenticated)"
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

For testing towards the test endpoint `gateway.test.clearhaus.com` please use
PANs that are either <b>not</b>
<a href="https://en.wikipedia.org/wiki/Luhn_algorithm">Luhn-compliant</a>, are
one of the special test PANs 2221000000000009, 4111111111111111,
5500000000000004, or are Apple Pay test cards.

For PANs starting with 420000 and ending with 0000, and PANs starting with
555555 and ending with 4444, you can specify a valid status `code` as
transaction amount to trigger the status.


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
https://gateway.clearhaus.com/credits
https://gateway.clearhaus.com/credits/:id
https://gateway.clearhaus.com/cards/:id/credits

# cards
https://gateway.clearhaus.com/cards
https://gateway.clearhaus.com/cards/:id

# account
https://gateway.clearhaus.com/account
````

## Changes

Sorted by descending timestamp.

### Add credits resource

Starting 2018-08-31T13:30:00+00:00 the `/credits` resource has been added,
enabling creation of credits without card tokenization. This is an essential
addition, as card tokenization, including the resource `/cards/:id/credits`, is
deprecated and will be removed on November 15, 2018.

### Accept 3-D Secure PARes for MobilePay Online

Starting 2018-08-31T13:30:00+00:00 the parameter `mobilepayonline[pares]` is
accepted.

### VES support

Starting 2018-08-31T13:30:00+00:00 we support the currency VES.

### Add payment methods

Payment methods have been added to the authorizations resource on 2018-07-20.
Also, a few parameters and an endpoint have been deprecated. Refer to [the
documentation source code
changes](https://github.com/clearhaus/gateway-api-docs/pull/53/files) for the
exact documentation change.

Please notice that there is no major version number change, so we stay backwards
compatible until the deprecations take effect. We expect the deprecations to
happen on 2018-11-15; it will be announced separately.

### STD no longer accepted from July 2018

Starting 2018-07-01T00:00:00+00:00 the currency STD is no longer accepted.

### MRU and STN support

Starting 2018-05-15T13:00:00+00:00 we support the currencies MRU and STN.

### CLP and UGX exponent changes

CLP and UGX changes from exponent 2 to exponent 0.

Transactions in CLP or UGX will be declined between 2017-10-12T19:00:00+00:00
and 2017-10-15T19:00:00+00:00 (both inclusive); before this timespan, the
exponent is 2; after the timespan, the exponent is 0.


[JSON-HAL]: http://tools.ietf.org/html/draft-kelly-json-hal "IETF HAL draft"
[HATEOAS]: http://en.wikipedia.org/wiki/HATEOAS
[Tokenization]: http://en.wikipedia.org/wiki/Tokenization_(data_security)
[3D-Secure]: http://www.3dsecure.io
[ApplePay-PaymentToken]: https://developer.apple.com/library/content/documentation/PassKit/Reference/PaymentTokenJSON/PaymentTokenJSON.html
[GooglePay-PaymentCryptography]: https://developers.google.com/pay/api/web/guides/resources/payment-data-cryptography
